package com.echonative;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  private static Activity mCurrentActivity = null;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mCurrentActivity = this;
    checkPermission(Manifest.permission.BLUETOOTH, 14);
    checkPermission(Manifest.permission.BLUETOOTH_ADMIN, 52);
    checkPermission(Manifest.permission.ACCESS_COARSE_LOCATION, 150);
    checkPermission(Manifest.permission.ACCESS_FINE_LOCATION, 99);
  }

  public static Activity getActivity(){
    Activity activity = new Activity();
    activity = mCurrentActivity;
    return activity;
  }

  public void checkPermission(String permission, int requestCode)
  {
    // Checking if permission is not granted
    if (ContextCompat.checkSelfPermission(MainActivity.this, permission) == PackageManager.PERMISSION_DENIED) {
      Log.d("Log", "Refuser");
      ActivityCompat.requestPermissions(MainActivity.this, new String[] { permission }, requestCode);
      Log.d("Log", "Request");
    }
    else {
      Log.d("Log", "Autoriser");
    }
  }


  @Override
  protected String getMainComponentName() {
    return "EchoNative";
  }
}
