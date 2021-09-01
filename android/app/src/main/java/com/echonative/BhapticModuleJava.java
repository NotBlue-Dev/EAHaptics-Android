package com.echonative;

import androidx.annotation.NonNull;

import com.bhaptics.bhapticsmanger.BhapticsManager;
import com.bhaptics.bhapticsmanger.BhapticsModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

public class BhapticModuleJava extends ReactContextBaseJavaModule {
    BhapticModuleJava(ReactApplicationContext context) {
        super(context);

    }


    @Override
    public String getName() {
        return "BhapticModuleJava";
    }

    @ReactMethod
    public void getHapticList(Callback callback) {
        BhapticsModule.initialize(MainActivity.getActivity());

        BhapticsManager bhapticsManager = BhapticsModule.getBhapticsManager();

        callback.invoke(bhapticsManager.getDeviceList().toString());
    }
}
