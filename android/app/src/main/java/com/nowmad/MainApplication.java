package com.nowmad;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.vydia.RNUploader.UploaderReactPackage;
import com.airbnb.android.react.maps.MapsPackage;
import io.sentry.RNSentryPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new RNMixpanel(),
            new UploaderReactPackage(),
            new MapsPackage(),
            new RNSentryPackage(),
            new ReactNativeRestartPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new ReactNativeConfigPackage()
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
