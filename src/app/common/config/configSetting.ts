import { Title } from "@angular/platform-browser";

export const ConfigSetting = {
    requestType: {
        NEW: {
            'code': 'NEW',
            'name': 'Cấp mới'
        },
        SERVICE_EXTENSION: {
            'code': 'SERVICE_EXTENSION',
            'name': 'Gia hạn'
        },
        CHANGE_CERTIFICATE_INFO: {
            'code': 'CHANGE_CERTIFICATE_INFO',
            'name': 'Thay đổi thông tin'
        },
        RENEW: {
            'code': 'RENEW',
            'name': 'Cấp lại'
        },
        'SUSPEND_CERTIFICATE': {
            'code': 'SUSPEND_CERTIFICATE',
            'name': 'Tạm dừng'
        },
        REINSTATE_CERTIFICATE: {
            'code': 'REINSTATE_CERTIFICATE',
            'name': 'Khôi phục'
        },
        REVOKE_CERTIFICATE: {
            'code': 'REVOKE_CERTIFICATE',
            'name': 'Thu hồi'
        },
    } as { [key: string]: { code: string; name: string; } },
    requestStatusConfig: [
        { 'code': 'NEW', 'name': 'Mới' },
        { 'code': 'progress', 'name': 'Đang xử lý' },
        { 'code': 'approved', 'name': 'Đã phê duyệt' },
        { 'code': 'reject', 'name': 'Từ chối' },
        { 'code': 'archive', 'name': 'Đã huỷ' },
        { 'code': 'done', 'name': 'Hoàn thành' },
        { 'code': 'issuedCertificate', 'name': 'Đã cấp chứng thư' },
        { 'code': 'pendingConfirmation', 'name': 'Chờ xác nhận' },
        { 'code': 'lackOfRecord', 'name': 'Thiếu hồ sơ' }
    ],
    requestTypeConfig: [
        { 'code': 'NEW', 'name': 'Cấp mới' },
        { 'code': 'CHANGE_CERTIFICATE_INFO', 'name': 'Thay đổi thông tin' },
        { 'code': 'SERVICE_EXTENSION', 'name': 'Gia hạn dịch vụ' },
        { 'code': 'SUSPEND_CERTIFICATE', 'name': 'Tạm dừng' },
        { 'code': 'REINSTATE_CERTIFICATE', 'name': 'Khôi phục' },
        { 'code': 'REVOKE_CERTIFICATE', 'name': 'Thu hồi' },
        { 'code': 'RESET_PIN', 'name': 'Reset pin' },
        { 'code': 'RENEW', 'name': 'Cấp lại' }
    ],
    ListRequestType: {
        NEW: {
            'code': 'NEW',
            'name': 'Cấp mới',
        },
        CHANGE_CERTIFICATE_INFO: {
            'code': 'CHANGE_CERTIFICATE_INFO',
            'name': 'Thay đổi thông tin',
        },
        SERVICE_EXTENSION: {
            'code': 'SERVICE_EXTENSION',
            'name': 'Gia hạn dịch vụ',
        },
        SUSPEND_CERTIFICATE: {
            'code': 'SUSPEND_CERTIFICATE',
            'name': 'Tạm dừng',
        },
        REINSTATE_CERTIFICATE: {
            'code': 'REINSTATE_CERTIFICATE',
            'name': 'Khôi phục',
        },
        REVOKE_CERTIFICATE: {
            'code': 'REVOKE_CERTIFICATE',
            'name': 'Thu hồi',
        },
        RESET_PIN: {
            'code': 'RESET_PIN',
            'name': 'Reset PIN',
        },
        RENEW: {
            'code': 'RENEW',
            'name': 'Cấp lại',
        }
    } as { [key: string]: { code: string; name: string; } },

    listDeviceType: [
        {
            'code': 'LOCK_DEVICE',
            'name': 'Khóa Thiết bị'
        },
        {
            'code': 'UNLOCK_DEVICE',
            'name': 'Mở khóa Thiết bị'
        },
    ],
    listClientType: [
        {
            'code': 'PERSONAL',
            'name': 'Khách hàng cá nhân',
        },
        {
            'code': 'ORGANIZATION',
            'name': 'Khách hàng doanh nghiệp',
        },
        {
            'code': 'STAFF',
            'name': 'Khách hàng cá nhân thuộc doanh nghiệp',
        },
    ],
    listDevices: [
        {
            'code': 'TOKEN',
            'name': 'TOKEN'
        },
        {
            'code': 'SIM',
            'name': 'SIM'
        },
    ],
    clientConfig: {
        'PERSONAL': {
            'code': 'PERSONAL',
            'name': 'Khách hàng cá nhân',
            'name1': 'Cá nhân'
        },
        'ORGANIZATION': {
            'code': 'ORGANIZATION',
            'name': 'Khách hàng doanh nghiệp',
            'name1': 'Tổ chức'
        },
        'STAFF': {
            'code': 'STAFF',
            'name': 'Khách hàng cá nhân thuộc doanh nghiệp',
            'name1': 'CNTTC'
        }
    } as { [key: string]: { code: string, name: string, name1: string } },

    requestStatus: {
        NEW: {
            'code': 'NEW',
            'name': 'Mới'
        },
        progress: {
            'code': 'progress',
            'name': 'Đang xử lý'
        },
        approved: {
            'code': 'approved',
            'name': 'Đã phê duyệt'
        },
        reject: {
            'code': 'reject',
            'name': 'Từ chối'
        },
        archive: {
            'code': 'archive',
            'name': 'Đã hủy'
        },
        done: {
            'code': 'done',
            'name': 'Hoàn thành'
        },
        issuedCertificate: {
            'code': 'issuedCertificate',
            'name': 'Đã cấp chứng thư'
        },
        pendingConfirmation: {
            'code': 'pendingConfirmation',
            'name': 'Chờ xác nhận'
        },
        lackOfRecord: {
            'code': 'lackOfRecord',
            'name': 'Thiếu hồ sơ'
        },
    } as { [key: string]: { code: string, name: string } },
    quarters: [
        { 'code': 1, 'name': 'Quý I' },
        { 'code': 2, 'name': 'Quý II' },
        { 'code': 3, 'name': 'Quý III' },
        { 'code': 4, 'name': 'Quý IV' },
        { 'code': 5, 'name': 'Quý V' },
    ],
    sendedToNEAC: [
        {
            'code': 1,
            'name': 'Đã gửi',
        },

        {
            'code': 0,
            'name': 'Chưa gửi',
        },
    ],
    listRequestReport: [
        {
            'code': 'NEW',
            'name': 'Cấp mới',
        },

        {
            'code': 'SERVICE_EXTENSION',
            'name': 'Gia hạn dịch vụ',
        },

        {
            'code': 'REVOKE_CERTIFICATE',
            'name': 'Thu hồi',
        },
        {
            'code': 'RENEW',
            'name': 'Cấp lại',
        }
    ],
    listStatusSim: [
        {
            'code': 'NOT_USE',
            'name': 'Chưa dùng'
        },
        {
            'code': 'USED',
            'name': 'Đã dùng'
        },
        {
            'code': 'ARCHIVE',
            'name': 'Lưu trữ'
        },
    ],
    certificateProfileStatus: {
        draft: {
            'code': 'draft',
            'name': 'Nháp'
        },
        publish: {
            'code': 'publish',
            'name': 'Xuất bản'
        },
        archive: {
            'code': 'archive',
            'name': 'Lưu trữ'
        },
    } as { [key: string]: { code: string, name: string } },
    listRoles: [
        {'code': 'censorCa', 'name': 'Kiểm duyệt viên CA'},
        {'code': 'manager', 'name': 'Quản lý'},
        {'code': 'sale', 'name': 'Nhân viên kinh doanh'},
    ],
    listRoles1: [
        {'code': 'censorCa', 'name': 'Kiểm duyệt viên CA'},
        {'code': 'superAdmin', 'name': 'Admin hệ thống'},
        {'code': 'manager', 'name': 'Quản lý'},
        {'code': 'sale', 'name': 'Nhân viên kinh doanh'},
    ],
    certificateStatus: {
        available: {
            'code': 'available',
            'name': 'Hoạt động'
        },
        archive: {
            'code': 'archive',
            'name': 'Lưu trữ'
        },
        suspend: {
            'code': 'suspend',
            'name': 'Tạm dừng'
        },

    } as { [key: string]: { code: string, name: string } },
    
}
