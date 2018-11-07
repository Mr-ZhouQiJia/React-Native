package com.aloestec.app.wham;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.sentry.RNSentryPackage;
import com.imagepicker.ImagePickerPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.aloestec.oss.RNAliyunOssPackage;
import com.aloestec.app.wham.upgrade.UpgradePackage;
import com.aloestec.contacts.ReactNativeContacts;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.aloestec.app.wham.BuildConfig;
import com.tencent.bugly.crashreport.CrashReport;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
    return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNSentryPackage(),
            new ImagePickerPackage(),
            new OrientationPackage(),
            new LinearGradientPackage(),
            new RNFetchBlobPackage(),
            new FastImageViewPackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG, "http://config.aloestec.com/"),
            new SplashScreenReactPackage(),
            new RNAliyunOssPackage(),
            new ReactNativeContacts(),
            new RNCameraPackage(),
            new UpgradePackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    CrashReport.initCrashReport(getApplicationContext(), "5d578346b7", false); 
    SoLoader.init(this, /* native exopackage */ false);
  }
}
