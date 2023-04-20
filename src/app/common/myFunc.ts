import * as forge from 'node-forge';
import { ConfigSetting } from './config/configSetting';









export const myFunc = {
    isEmpty: (value: string | number | object | any[] | undefined) => {
        if (!value) {
            return true;
        }
        if (Array.isArray(value) && value.length === 0) {
            return true
        }
        if (typeof value == 'string' && value === '') {
            return true
        }
        if (typeof value == 'number' && value === 0) {
            return true
        }
        if (typeof value == 'object' && Object.keys(value).length === 0) {
            return true
        }

        return false
    },
    getError: function (err: any) {
        let resultErr: any = ''


        if (!this.isEmpty(err)) {
            if (typeof err == 'object') {
                resultErr = err.error.errMsg || 'Có lỗi xảy ra trong quá trình xử lý.'
            }
        }
        return resultErr
    },

    getObjectFromBlobUrl: (blobUrl: string, filename: string): Promise<{ fileName: string, fileContent: string }> => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', blobUrl);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                const blob = xhr.response;
                const reader = new FileReader();
                reader.onloadend = function () {
                    const object = {
                        fileName: blob.name || filename || '',
                        fileContent: reader.result!.toString().split(',')[1]
                    };
                    resolve(object);
                };
                reader.readAsDataURL(blob);
            };
            xhr.onerror = function () {
                reject(xhr.status);
            };
            xhr.send();
        });
    },

    readFileCer: async (base64Cert: string) => {

        const pemCert = `-----BEGIN CERTIFICATE-----\n${atob(base64Cert)}\n-----END CERTIFICATE-----`;

        const cert = forge.pki.certificateFromPem(pemCert);
        // const subjectDN = cert.subject.attributes.map(attr => `${attr.shortName}=${attr.value}`).join(',');

        let certInfo: any = {}
        console.log(cert.subject.attributes);


        cert.subject.attributes.forEach((attribute: any) => {
            switch (attribute.type) {
                case '2.5.4.6':
                    certInfo.countryName = decodeURIComponent(escape(attribute?.value || ''))
                    break
                case '2.5.4.8':
                    certInfo.stateOrProvinceName = decodeURIComponent(escape(attribute?.value || ''))
                    break
                case '2.5.4.10':
                    certInfo.organizationName = decodeURIComponent(escape(attribute?.value || ''))
                    break
                case '2.5.4.3':
                    certInfo.commonName = decodeURIComponent(escape(attribute?.value || ''))
                    break
                case '0.9.2342.19200300.100.1.1':
                    certInfo.uid = decodeURIComponent(escape(attribute?.value || ''))
                    break

            }
        });
        certInfo.serial = cert?.serialNumber || ''
        certInfo.notAfter = cert?.validity?.notAfter || ''
        certInfo.notBefore = cert?.validity?.notBefore || ''
        const subjectDN = cert.subject.attributes.map(attr => `${attr.shortName || 'uid'}=${forge.util.decodeUtf8(typeof (attr.value) == 'string' ? attr.value : '')}`).join(',');
        return {
            // 'cert': cert,
            'subjectDN': subjectDN,
            'certInfo': certInfo
        };

    },

    //format lại info theo định dạng trên serve(thêm mới giao dịch thiết bị)
    clientInfo: (item: any | undefined): object => {
        let info: object | any = {
            organizationFile: [],
            organizationInfo: {
                name: '',
                position: '',
                identifyNo: '',
                licenseType: '',
            }
        }
        if (!myFunc.isEmpty(item) && item.type) {
            info = item
            switch (item.type) {

                case ConfigSetting.clientConfig['PERSONAL'].code:
                    info.email = item?.customerPersonalInfo?.email;
                    info.phone = item?.customerPersonalInfo?.phone;
                    info.idCardType = item?.customerPersonalInfo?.idCardType;
                    info.idCardFile = item?.customerPersonalInfo?.idCardFile;
                    break
                case ConfigSetting.clientConfig['ORGANIZATION'].code:
                    info.email = item?.customerBussinessInfo?.email;
                    info.phone = item?.customerBussinessInfo?.phone;
                    info.representativeName = item?.customerBussinessInfo?.representativeName;

                    info.licenseFile = item?.customerBussinessInfo?.licenseFile;
                    info.representativeFile = item?.customerBussinessInfo?.representativeFile;
                    break
                case ConfigSetting.clientConfig['STAFF'].code:
                    info.email = item?.customerStaffInfo?.email;
                    info.phone = item?.customerStaffInfo?.phone;
                    info.idCardType = item?.customerStaffInfo?.idCardType;
                    info.idCardFile = item?.customerStaffInfo?.idCardFile;
                    info.organizationFile = item?.customerStaffInfo?.organizationFile;

                    info.organizationInfo = {
                        identifyNo: item?.customerStaffInfo?.orgranizationLicenseId,
                        licenseType: item?.customerStaffInfo?.orgranizationLicenseType,
                        position: item.customerStaffInfo.position,
                        name: item?.customerStaffInfo?.orgranizationName,
                    }
                    break
            }
        }
        return info
    },

    //đọc file pki
    readFilePKI(file: any) {
        const reader = new FileReader();
        reader.readAsText(file);
        let result: any = []
        reader.onload = () => {
            const pkiContent: any = reader.result;
            const lines = pkiContent.split('\n');
            lines.forEach((line: string) => {
                if (line.startsWith('CARD')) {
                    const fields = line.split(' ')
                    console.log(fields);
                    
                    result.push({
                        'iccid': fields[1].toString(),
                        'imsi': fields[2].toString(),
                        'keyIndex': fields[8].toString(),
                        'kicKey': fields[9].toString(),
                        'kidKey': fields[10].toString().replace('\r',''),
                    })
                    
                }
            })
        }

        return result

    }


}