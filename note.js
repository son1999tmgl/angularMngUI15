module.exports = class requestDeviceCtrl extends controller {
    constructor(ctx) {
        super(ctx);
        this.customerService = new customerService();
        this.tmsRAProcess = tmsRAProcess;
        this.fileService = new fileService();
        this.tmsRAService = new tmsRAService();
        this.MSSPService = new MSSPService(this.ctx.headers.encryptuser);
        this.requestHelper = requestHelper;
    }

    /**
     * Thuc hien lay danh sach request reset pin
     */
    async pullRequestResetPin() {
        try {
            //lay tat cac request reset pin tu TMS
            let resultResetPinTMS = await this.tmsRAService.getResetPinTokenForTMSRA('PENDING');

            //thuc hien update request
            let listFormFactorTokenInfo = resultResetPinTMS.formFactorTokenInfo;
            let customerInfo, tmpCustomerInfo, requestData, requestDeviceInfo;
            lodash.each(listFormFactorTokenInfo, async(item) => {
                //lay danh sach request chua co requestIdOfTMSRA trong db
                requestDeviceInfo = await this.model.requestDevice.scope([
                    { method: ['filterRequestIdOfTMSRA', item.formFactorTokenID] }
                ]).findOne();
                //lay thong tin khach hang theo so hardTokenSN
                customerInfo = await this.customerService.getCustomerDeviceInfo(typeConfig.CONST_DEVICE_STATUS_AVAILABLE, item.formFactorSN);

                if (!requestDeviceInfo && customerInfo) {
                    tmpCustomerInfo = customerInfo.data;
                    requestData = {
                        requestIdOfTMSRA: item.formFactorTokenID
                    }
                    await this.model.requestDevice.create({
                        'customerId': tmpCustomerInfo.id,
                        'customerInfo': tmpCustomerInfo,
                        'requestData': requestData,
                        'requestDeviceType': typeConfig.CONST_REQUEST_DEVICE_TYPE_RESET_PIN,
                        'deviceType': typeConfig.CONST_DEVICE_TYPE_TOKEN,
                        'status': typeConfig.CONST_REQUEST_STATUS_PROGRESS,
                        'reason': '',
                        'deviceSerialNo': item.formFactorSN,
                        'registrationFile': [],
                        'creatorId': this.userInfo.id,
                        'creatorInfo': this.userInfo,
                        'approvalUserInfo': {},
                        'approvalUserId': 0,
                        'createdAt': moment().format('YYYY-MM-DD HH:mm:ss'),
                        'updatedAt': moment().format('YYYY-MM-DD HH:mm:ss')
                    });
                }
            });
            return this.response({ status: true });
        } catch (error) {
            console.log('error :>> ', error);
            let errMsg = (error.responseMessage) ? (error.responseMessage) : error.messages;
            return this.response({ status: false, errMsg: errMsg }, 500);
        }
    }

    /**
     * Thuc hien phe duyet request reset pin
     * @param {*} id 
     */
    async approvalRequestResetPin(id) {
        //validate
        let validate = await this.validate({ id: id }, {
            'id': "required|numeric|exists:requestDevice,id"
        }, {
            'id.required': "Mã yêu cầu thiết bị không được bỏ trống",
            'id.numeric': "Mã yêu cầu thiết bị không đúng định dạng",
            'id.exists': "Mã yêu cầu thiết bị không tồn tại"
        });

        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        let requestDeviceInfo = await this.model.requestDevice.scope([
            { method: ['filterId', id] },
            { method: ['filterStatus', typeConfig.CONST_REQUEST_STATUS_PROGRESS] },
        ]).findOne();

        if (!requestDeviceInfo) {
            return this.response({ status: false, errMsg: "Hồ sơ không nằm trong trạng thái có thể kiểm duyệt" }, 422);
        }

        //thuc hien duyet ho so thiet bi
        const transaction = await this.model.sequelize.transaction();
        try {
            //send request duyet len tms
            let resultApproval = await this.tmsRAService.approvalResetPinTokenForTMSRA(requestDeviceInfo.deviceSerialNo, requestDeviceInfo.requestData.requestIdOfTMSRA);
            if (!resultApproval) {
                return this.response({ status: false, errMsg: "Xảy ra lỗi hệ thống khi duyệt giao dịch trên TMS" }, 500);
            }

            requestDeviceInfo.approvalUserId = this.userInfo.id;
            requestDeviceInfo.approvalUserInfo = this.userInfo;
            requestDeviceInfo.status = typeConfig.CONST_REQUEST_STATUS_DONE;
            await requestDeviceInfo.save({ transaction: transaction });

            await transaction.commit();
            return this.response({ status: true });
        } catch (error) {
            await transaction.rollback();
            return this.response({ status: false, errMsg: "Xảy ra lỗi hệ thống khi duyệt giao dịch" }, 500);
        }
    }

    /**
     * Thực hiện huỷ request reset pin
     * @param {*} id 
     */
    async archiveRequestResetPin(id) {
        //validate
        let validate = await this.validate({ id: id }, {
            'id': "required|numeric|exists:requestDevice,id"
        }, {
            'id.required': "Mã yêu cầu thiết bị không được bỏ trống",
            'id.numeric': "Mã yêu cầu thiết bị không đúng định dạng",
            'id.exists': "Mã yêu cầu thiết bị không tồn tại"
        });

        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        let requestDeviceInfo = await this.model.requestDevice.scope([
            { method: ['filterId', id] },
            { method: ['filterStatus', typeConfig.CONST_REQUEST_STATUS_PROGRESS] },
        ]).findOne();

        if (!requestDeviceInfo) {
            return this.response({ status: false, errMsg: "Hồ sơ không nằm trong trạng thái có thể huỷ" }, 422);
        }

        //thuc hien huy
        const transaction = await this.model.sequelize.transaction();
        try {
            //send request huy len tms
            let resultArchive = await this.tmsRAService.cancelResetPinTokenForTMSRA(requestDeviceInfo.deviceSerialNo, requestDeviceInfo.requestData.requestIdOfTMSRA);
            if (!resultArchive) {
                return this.response({ status: false, errMsg: "Xảy ra lỗi hệ thống khi huỷ giao dịch trên TMS" }, 500);
            }

            requestDeviceInfo.approvalUserId = this.userInfo.id;
            requestDeviceInfo.approvalUserInfo = this.userInfo;
            requestDeviceInfo.status = typeConfig.CONST_REQUEST_STATUS_ARCHIVE;
            await requestDeviceInfo.save({ transaction: transaction });

            await transaction.commit();
            return this.response({ status: true });
        } catch (error) {
            await transaction.rollback();
            return this.response({ status: false, errMsg: "Xảy ra lỗi hệ thống khi huỷ giao dịch" }, 500);
        }
    }

    /**
     * Thực hiện tu choi request reset pin
     * @param {*} id 
     */
    async rejectRequestResetPin(id) {
        //validate
        let validate = await this.validate({ id: id }, {
            'id': "required|numeric|exists:requestDevice,id",
            'reason': "required"
        }, {
            'id.required': "Mã yêu cầu thiết bị không được bỏ trống",
            'id.numeric': "Mã yêu cầu thiết bị không đúng định dạng",
            'id.exists': "Mã yêu cầu thiết bị không tồn tại",
            'reason.required': "Lý do từ chối không được bỏ trống"
        });

        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        let requestDeviceInfo = await this.model.requestDevice.scope([
            { method: ['filterId', id] },
            { method: ['filterStatus', typeConfig.CONST_REQUEST_STATUS_PROGRESS] },
        ]).findOne();

        if (!requestDeviceInfo) {
            return this.response({ status: false, errMsg: "Hồ sơ không nằm trong trạng thái có thể từ chối" }, 422);
        }

        //thuc hien tu choi
        const transaction = await this.model.sequelize.transaction();
        try {
            //send request huy len tms
            let resultReject = await this.tmsRAService.cancelResetPinTokenForTMSRA(requestDeviceInfo.deviceSerialNo, requestDeviceInfo.requestData.requestIdOfTMSRA);
            if (!resultReject) {
                return this.response({ status: false, errMsg: "Xảy ra lỗi hệ thống khi từ chối dịch trên TMS" }, 500);
            }

            requestDeviceInfo.approvalUserId = this.userInfo.id;
            requestDeviceInfo.approvalUserInfo = this.userInfo;
            requestDeviceInfo.reason = this.getInput('reason');
            requestDeviceInfo.status = typeConfig.CONST_REQUEST_STATUS_REJECT;
            await requestDeviceInfo.save({ transaction: transaction });

            await transaction.commit();
            return this.response({ status: true });
        } catch (error) {
            await transaction.rollback();
            return this.response({ status: false, errMsg: "Xảy ra lỗi hệ thống khi từ chối giao dịch" }, 500);
        }
    }

    /**
     * Thuc hien lay danh sach request device
     */
    async listRequestDevice() {
        let page = this.getInput('page', 1);
        let perPage = this.getInput('perPage', 15);
        let requestDeviceType = this.getInput('requestDeviceType', '');
        let status = this.getInput('status', '');
        let deviceType = this.getInput('deviceType', '');
        let freeText = this.getInput('freeText', '');
        let orderBy = this.getInput('orderBy', '');
        let sortBy = this.getInput('sortBy', 'asc');
        let customerId = this.getInput('customerId', 0);

        let validateData = {
            page: page,
            perPage: perPage,
            orderBy: orderBy,
            sortBy: sortBy
        }
        let validateCond = {
            page: 'required|numeric',
            perPage: 'required|numeric',
            orderBy: 'required',
            sortBy: 'required'
        }
        let validateMessage = {
            'page.required': 'Số trang không được bỏ trống',
            'perPage.required': 'Số bản ghi trên trang không được bỏ trống',
            'page.numeric': 'Số trang không đúng định dạng',
            'perPage.numeric': 'Số bản ghi trên trang không đúng định dạng',
            'orderBy.required': 'orderBy không được bỏ trống',
            'sortBy.required': 'sortBy không được bỏ trống'
        };

        if (status) {
            if (!typeConfig.existsRequestStatus([status])) {
                return this.response({ status: "Trạng thái không đúng định dạng" }, 422);
            }
            validateData.status = status;
            validateCond.status = "required";
            validateMessage['status.required'] = "Trạng thái không được bỏ trống";
        }

        if (requestDeviceType) {
            if (!typeConfig.existsRequestDeviceType([requestDeviceType])) {
                return this.response({ deviceStatus: "Loại thiết bị không đúng định dạng" }, 422);
            }
            validateData.requestDeviceType = requestDeviceType;
            validateCond.requestDeviceType = "required";
            validateMessage['requestDeviceType.required'] = "Loại thiết bị không được bỏ trống";
        }

        if (deviceType) {
            if (!typeConfig.existsDeviceType([deviceType])) {
                return this.response({ deviceStatus: "Thiết bị không đúng định dạng" }, 422);
            }
            validateData.deviceType = deviceType;
            validateCond.deviceType = "required";
            validateMessage['deviceType.required'] = "Thiết bị không được bỏ trống";
        }

        if (customerId) {
            validateData.customerId = customerId;
            validateCond.customerId = "required|numeric";
            validateMessage['customerId.required'] = "Mã khách hàng không được bỏ trống";
            validateMessage['customerId.numeric'] = "Mã khách hàng không đúng định dạng";
        }

        let validate = await this.validate(validateData, validateCond, validateMessage);
        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        let pagging = this.myFunc.buildLimitOffset(page, perPage);
        let { count, rows: listRequestDevice } = await this.model.requestDevice.scope([
            { method: ['filterRequestDeviceType', requestDeviceType] },
            { method: ['filterStatus', status] },
            { method: ['filterDeviceType', deviceType] },
            { method: ['filterCustomerId', customerId] },
            { method: ['filterFreeText', freeText] }
        ]).findAndCountAll({
            limit: pagging.limit,
            offset: pagging.offset,
            order: [
                [orderBy, sortBy]
            ]
        });

        return this.response({
            data: listRequestDevice,
            pagging: {
                page: (parseInt(pagging.offset) / parseInt(pagging.limit)) + 1,
                perPage: parseInt(pagging.limit)
            },
            total: count
        });
    }

    /**
     * Thuc hien tao ho so thiet bi
     */
    async createRequestDevice() {
        //validate
        let validate = await this._validateCreateRequestDevice(this.getData());
        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        if (this.getInput('registrationFile')) {
            validate = await this.validate({
                registrationFile: this.getInput('registrationFile')
            }, {
                'registrationFile': 'array|requestFile'
            }, {
                'registrationFile.array': 'Phiếu đăng ký không đúng định dạng',
                'registrationFile.requestFile': 'Phiếu đăng ký không đúng định dạng'
            })
            if (validate.fails()) {
                return this.response(validate.messages(), 422);
            }
        }

        //check agency co dung tms cua newtel khong
        //lay danh sach agency su dung tms cua newtel (agencyHasTMS = 0, customerId, deviceStatus = available, hardDeviceSN)
        let listCustomerDevice = [];
        switch (this.getInput('requestDeviceType')) {
            case typeConfig.CONST_REQUEST_DEVICE_TYPE_LOCK:
                listCustomerDevice = await this.customerService.getListCustomerDevice(this.getInput('customerId'), typeConfig.CONST_DEVICE_STATUS_AVAILABLE, 0, this.getInput('deviceSerialNo'));
                break;
            case typeConfig.CONST_REQUEST_DEVICE_TYPE_UNLOCK:
                listCustomerDevice = await this.customerService.getListCustomerDevice(this.getInput('customerId'), typeConfig.CONST_DEVICE_STATUS_SUSPEND, 0, this.getInput('deviceSerialNo'));
                break;
        }

        //kiem tra deviceSerialNo co hop le hay khong
        if (!listCustomerDevice || listCustomerDevice.data.length < 1) { //neu khong co
            return this.response({ status: false, 'errMsg': 'Số serial number của thiết bị không hợp lệ' }, 422);
        }

        //thuc hien tao moi request device
        const transaction = await this.model.sequelize.transaction();
        try {
            let deviceType = this.getInput('deviceType');
            let requestDeviceInfo = await this.model.requestDevice.create({
                'customerId': this.getInput('customerId'),
                'customerInfo': {},
                'requestData': {},
                'requestDeviceType': this.getInput('requestDeviceType'),
                'deviceType': deviceType,
                'status': typeConfig.CONST_REQUEST_STATUS_PROGRESS,
                'reason': this.getInput('reason'),
                'deviceSerialNo': this.getInput('deviceSerialNo'),
                'registrationFile': [],
                'creatorId': this.userInfo.id,
                'creatorInfo': this.userInfo,
                'approvalUserInfo': {},
                'approvalUserId': 0,
                'createdAt': moment().format('YYYY-MM-DD HH:mm:ss'),
                'updatedAt': moment().format('YYYY-MM-DD HH:mm:ss')
            }, { transaction });
            let remainData = await this._buildRemainData(requestDeviceInfo, this.getData());
            if (!remainData.status) {
                if (remainData.errCustomerInfo) {
                    await transaction.rollback();
                    return this.response({ status: false, 'errMsg': 'Không tạo được thông tin khách hàng' }, 500);
                }

                if (remainData.errRegistrationFile) {
                    await transaction.rollback();
                    return this.response({ status: false, 'errMsg': 'Không tạo được file đăng ký' }, 500);
                }
            }

            requestDeviceInfo.customerInfo = remainData.customerInfo;
            requestDeviceInfo.registrationFile = remainData.registrationFile;

            if (this.isAgency) { //neu la agency

            } else { //neu la censorCa
                //send request len TMS
                await this._doToggleDevice(requestDeviceInfo, deviceType);
                requestDeviceInfo.approvalUserId = this.userInfo.id;
                requestDeviceInfo.approvalUserInfo = this.userInfo;
                requestDeviceInfo.status = typeConfig.CONST_REQUEST_STATUS_DONE;
                requestDeviceInfo.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
                await requestDeviceInfo.save({ transaction: transaction });
            }

            await transaction.commit();
            return this.response({ status: true, requestDeviceId: requestDeviceInfo.id });
        } catch (error) {
            await transaction.rollback();
            return this.responseErr(error);
        }
    }

    /**
     * Thuc hien khoa tu dong thiet bi neu nhu khach hang chua cung cap MB02
     * @param {*} requestId 
     * @returns 
     */
    async autoLockDevice(requestId) {
        //validate
        let validate = await this.validate({ requestId: requestId }, {
            'requestId': "required"
        }, {
            'requestId.required': "Mã hồ sơ không được bỏ trống"
        });

        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        //thuc hien khoa thiet bi
        const transaction = await this.model.sequelize.transaction();
        try {
            //thuc hien kiem tra thong tin request
            let requestInfo = await this.model.request.scope([
                { method: ['filterId', requestId] }
            ]).findOne();

            if (!requestInfo) throw new Error("Hồ sơ không tồn tại");
            if (!requestInfo.issuedCertificate) throw new Error("Hồ sơ chưa được cấp chứng thư");
            let confirmFile = requestInfo.requestData.confirmFile;
            if (typeof confirmFile.confirmationFile == 'undefined') throw new Error("Hồ sơ không cần tạo file xác nhận của khách hàng");
            if (confirmFile.confirmationFile === true) throw new Error("Hồ sơ đã có file xác nhận của khách hàng");
            //thuc hien tao thong tin requestDevice
            let deviceSerialNo;
            let certSN = requestInfo.requestData.certificateSN;

            switch (requestInfo.deviceType) {
                case typeConfig.CONST_DEVICE_TYPE_SIM:
                    deviceSerialNo = requestInfo.requestData.simInfo.ICCID;
                    break;
                case typeConfig.CONST_DEVICE_TYPE_TOKEN:
                    let respCustomerCertInfo = await this.customerService.getCustomerCertificateInfo(certSN);
                    deviceSerialNo = respCustomerCertInfo.data.deviceInfo.hardTokenSN;
                    break;
            }

            if (!deviceSerialNo) {
                await transaction.rollback();
                throw new Error(`Không tìm thấy deviceSerialNo đối với ${requestInfo.deviceType}`);
            }

            let requestDeviceInfo = await this.model.requestDevice.create({
                'customerId': requestInfo.customerId,
                'customerInfo': requestInfo.customerInfo,
                'requestData': {},
                'requestDeviceType': typeConfig.CONST_REQUEST_DEVICE_TYPE_LOCK,
                'deviceType': requestInfo.deviceType,
                'status': typeConfig.CONST_REQUEST_STATUS_PROGRESS,
                'reason': "Hệ thống tự động khoá",
                'deviceSerialNo': deviceSerialNo,
                'registrationFile': [],
                'creatorId': 0,
                'creatorInfo': {},
                'approvalUserInfo': {},
                'approvalUserId': 0,
                'createdAt': moment().format('YYYY-MM-DD HH:mm:ss'),
                'updatedAt': moment().format('YYYY-MM-DD HH:mm:ss')
            }, { transaction });

            await this._doToggleDevice(requestDeviceInfo, requestInfo.deviceType);
            requestDeviceInfo.status = typeConfig.CONST_REQUEST_STATUS_DONE;
            requestDeviceInfo.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
            await requestDeviceInfo.save({ transaction: transaction });

            await transaction.commit();
            return this.response({ status: true });
        } catch (error) {
            await transaction.rollback();
            return this.responseErr(error);
        }
    }

    /**
     * Thuc hien lock, unlock device ung voi tung loai thiet bi
     * @param {*} requestDeviceInfo 
     * @param {*} deviceType 
     */
    async _doToggleDevice(requestDeviceInfo, deviceType) {
        switch (requestDeviceInfo.requestDeviceType) {
            case typeConfig.CONST_REQUEST_DEVICE_TYPE_LOCK:
                if (deviceType == typeConfig.CONST_DEVICE_TYPE_TOKEN) {
                    await this.tmsRAService.lockUnlockTokenForTMSRA(
                        requestDeviceInfo.reason,
                        requestDeviceInfo.deviceSerialNo,
                        'LOCK'
                    );
                } else if (deviceType == typeConfig.CONST_DEVICE_TYPE_SIM) {
                    await this.MSSPService.lockSim(
                        requestDeviceInfo.deviceSerialNo
                    );
                }

                await this.customerService.updateCustomerDevice(requestDeviceInfo.customerId, requestDeviceInfo.deviceSerialNo, typeConfig.CONST_DEVICE_STATUS_SUSPEND);
                break;
            case typeConfig.CONST_REQUEST_DEVICE_TYPE_UNLOCK:
                if (deviceType == typeConfig.CONST_DEVICE_TYPE_TOKEN) {
                    await this.tmsRAService.lockUnlockTokenForTMSRA(
                        requestDeviceInfo.reason,
                        requestDeviceInfo.deviceSerialNo,
                        'UNLOCK'
                    );
                } else if (deviceType == typeConfig.CONST_DEVICE_TYPE_SIM) {
                    await this.MSSPService.unlockSim(
                        requestDeviceInfo.deviceSerialNo
                    );
                }

                await this.customerService.updateCustomerDevice(requestDeviceInfo.customerId, requestDeviceInfo.deviceSerialNo, typeConfig.CONST_DEVICE_STATUS_AVAILABLE);
                break;
        }
    }

    /**
     * Thuc hien lay thong tin requestDevice
     * @param {*} id 
     */
    async infoRequestDevice(id) {
        //validate
        let validate = await this.validate({ id: id }, {
            'id': "required|numeric|exists:requestDevice,id"
        }, {
            'id.required': "Mã yêu cầu thiết bị không được bỏ trống",
            'id.numeric': "Mã yêu cầu thiết bị không đúng định dạng",
            'id.exists': "Mã yêu cầu thiết bị không tồn tại"
        });

        if (validate.fails()) {
            return this.response(validate.messages(), 422);
        }

        let requestDeviceInfo = await this.model.requestDevice.scope([
            { method: ['filterId', id] }
        ]).findOne();

        if (!requestDeviceInfo) {
            return this.response({ status: false, errMsg: "Thông tin hồ sơ không tồn tại" }, 422);
        }

        return this.response(requestDeviceInfo);
    }

    /**
     * Thuc hien validate default request Data
     * @param {*} requestData
     */
    async _validateCreateRequestDevice(requestData) {
        let validate = await this.validate(requestData, {
            'customerId': "required|numeric",
            'deviceSerialNo': "required",
            'requestDeviceType': "required|requestDeviceType",
            'deviceType': 'required|deviceType',
            'reason': 'required'
        }, {
            'customerId.required': 'Mã khách hàng không được bỏ trống',
            'customerId.numeric': 'Mã khách hàng không đúng định dạng',
            'deviceSerialNo.required': 'Số serial thiết bị không được bỏ trống',
            'requestDeviceType.required': 'Định dạng thiết bị không được bỏ trống',
            'requestDeviceType.requestDeviceType': 'Định dạng thiết bị không đúng định dạng',
            'deviceType.required': 'Loại thiết bị không được bỏ trống',
            'deviceType.deviceType': 'Loại thiết bị không đúng định dạng',
            'reason.required': 'Lý do không đựợc bỏ trống'
        });

        return validate;
    }

    /**
     * Thuc hien tao cac thong tin con thieu cua request
     * @param {*} requestInfo 
     * @param {*} createData 
     */
    async _buildRemainData(requestInfo, createData) {
        //thuc hien tao customerInfo
        let requestDeviceId = requestInfo.id;
        let errCustomerInfo = false;
        let customerId, customerIdentifyNo, customerInfo;
        let cardFile;
        //thuc hien xu ly thong tin customer
        try {
            switch (createData.customerInfo.type) {
                case typeConfig.CONST_CUSTOMER_TYPE_ORGANIZATION:
                    customerId = createData.customerId;
                    customerIdentifyNo = createData.customerInfo.info.identifyNo;
                    customerInfo = {
                        type: createData.customerInfo.type,
                        info: {
                            commonName: createData.customerInfo.info.commonName,
                            identifyNo: createData.customerInfo.info.identifyNo,
                            licenseType: createData.customerInfo.info.licenseType,
                            email: createData.customerInfo.info.email,
                            phone: createData.customerInfo.info.phone,
                            city: createData.customerInfo.info.city,
                            district: createData.customerInfo.info.district,
                            representativeName: createData.customerInfo.info.representativeName,
                        },
                        licenseFile: createData.customerInfo.licenseFile,
                        representativeFile: createData.customerInfo.representativeFile
                    };
                    break;
                case typeConfig.CONST_CUSTOMER_TYPE_PERSONAL:
                    customerId = createData.customerId;
                    customerIdentifyNo = createData.customerInfo.info.identifyNo;
                    customerInfo = {
                        type: createData.customerInfo.type,
                        info: {
                            commonName: createData.customerInfo.info.commonName,
                            identifyNo: createData.customerInfo.info.identifyNo,
                            idCardType: createData.customerInfo.info.idCardType,
                            email: createData.customerInfo.info.email,
                            phone: createData.customerInfo.info.phone,
                            city: createData.customerInfo.info.city,
                            district: createData.customerInfo.info.district
                        },
                        idCardFile: createData.customerInfo.idCardFile
                    };
                    break;
                case typeConfig.CONST_CUSTOMER_TYPE_STAFF:
                    customerId = createData.customerId;
                    customerIdentifyNo = createData.customerInfo.info.identifyNo;
                    customerInfo = {
                        type: createData.customerInfo.type,
                        info: {
                            commonName: createData.customerInfo.info.commonName,
                            identifyNo: createData.customerInfo.info.identifyNo,
                            email: createData.customerInfo.info.email,
                            phone: createData.customerInfo.info.phone,
                            city: createData.customerInfo.info.city,
                            district: createData.customerInfo.info.district,
                            idCardType: createData.customerInfo.info.idCardType,
                            organizationInfo: {
                                name: createData.customerInfo.info.organizationInfo.name,
                                position: createData.customerInfo.info.organizationInfo.position,
                                identifyNo: createData.customerInfo.info.organizationInfo.identifyNo,
                                licenseType: createData.customerInfo.info.organizationInfo.licenseType
                            }
                        },
                        idCardFile: createData.customerInfo.idCardFile,
                        organizationFile: createData.customerInfo.organizationFile
                    };
                    break;
            }
        } catch (error) {
            errCustomerInfo = true;
        }

        //thuc hien upload registrationFile
        let registrationFile = await this._uploadRequestFile(
            createData.registrationFile,
            requestDeviceId,
            (requestInfo.registrationFile) ? requestInfo.registrationFile : []
        );
        if (!registrationFile) {
            return { status: false, errRegistrationFile: true }
        }
        if (errCustomerInfo) {
            return { status: false, errCustomerInfo: true }
        }
        return {
            status: true,
            customerId: customerId,
            customerIdentifyNo: customerIdentifyNo,
            customerInfo: customerInfo,
            registrationFile: registrationFile
        }
    }

    /**
     * Thuc hien upload requestFile
     * @param {*} arrFile 
     * @param {*} requestId 
     */
    async _uploadRequestFile(arrFile, requestDeviceId, arrDeleteFile) {
        let fileResult = [];
        let tmpResponseFile;
        let tmpFile;
        let tmpFileName;
        let extFile;
        arrDeleteFile = (typeof arrDeleteFile != 'undefined') ? arrDeleteFile : [];
        try {
            //thuc hien xoa file cu
            await this._deleteRequestFile(arrDeleteFile);
            //thuc hien them file moi
            for (let index in arrFile) {
                tmpFile = arrFile[index];
                tmpFileName = this.myFunc.makeUUID();
                extFile = (tmpFile.fileName && tmpFile.fileName.split(".").length > 0) ? tmpFile.fileName.split(".")[tmpFile.fileName.split(".").length - 1] : "pdf";
                tmpResponseFile = await this.fileService.uploadFile(
                    '/' + this.userInfo.id + '/requestDevice/' + requestDeviceId + '/' + tmpFileName + '.' + extFile,
                    tmpFile.fileContent
                );

                fileResult.push({
                    fileName: tmpFileName + '.' + extFile,
                    fileUrl: tmpResponseFile.data.link
                });
            }

            return fileResult;
        } catch (error) {
            return false;
        }
    }

    /**
     * 
     * @param {*} arrFile 
     */
    async _deleteRequestFile(arrFile) {
        let tmpFile;
        try {
            for (let index in arrFile) {
                tmpFile = arrFile[index];
                await this.fileService.deleteFile(
                    tmpFile.fileUrl
                );
            }

            return true;
        } catch (error) {
            return false;
        }
    }