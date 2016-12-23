require('Config,LBXScanWrapper,SubLBXScanViewController');
scan: function(sender) {
    var url = Config.sharedInstance().value();
    var pad_mac = Config.sharedInstance().mac();
    if (url.length() > 0) {
        self.qrcode({
            "value": url,
            "pad_mac": pad_mac
        });
        return;
    }

    if (!LBXScanWrapper.isGetCameraPermission()) {
        self.alertViewWithTitle_message_buttonTitles_result("提示", "请在设备的设置-隐私-相机中允许访问相机。", null, null);
        return;
    }

    var vc = SubLBXScanViewController.new();
    vc.setTitle("扫码登录");
    self.navigationController().pushViewController_animated(vc, YES);
    vc.setQRUrlBlock(block('NSString*', function(url) {
            self.alertViewWithMessage(url);
            self.navigationController().popViewControllerAnimated(NO);
            self.qrcodeLogin(url);
        }
    }));
}
