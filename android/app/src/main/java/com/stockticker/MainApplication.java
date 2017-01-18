package com.stockticker;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.github.yamill.orientation.OrientationPackage;
import cn.mandata.react_native_mpchart.MPChartPackage; 
import com.RNFetchBlob.RNFetchBlobPackage;      
import com.rnziparchive.RNZipArchivePackage;
import com.rnfs.RNFSPackage;


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new OrientationPackage(),
          new ReactMaterialKitPackage(),
          new MPChartPackage(),
          new RNFetchBlobPackage(),
          new RNZipArchivePackage(),
          new RNFSPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}