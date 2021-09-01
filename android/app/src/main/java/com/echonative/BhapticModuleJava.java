package com.echonative;

import androidx.annotation.NonNull;

import com.bhaptics.bhapticsmanger.BhapticsManager;
import com.bhaptics.bhapticsmanger.BhapticsManagerCallback;
import com.bhaptics.bhapticsmanger.BhapticsModule;
import com.bhaptics.bhapticsmanger.SdkRequestHandler;
import com.bhaptics.commons.model.BhapticsDevice;
import com.bhaptics.service.SimpleBhapticsDevice;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import android.os.Looper;
import android.util.Log;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class BhapticModuleJava extends ReactContextBaseJavaModule {

    private SdkRequestHandler sdkRequestHandler;
    private DeviceEventManagerModule.RCTDeviceEventEmitter mEmitter = null;


    BhapticModuleJava(ReactApplicationContext context) {
        super(context);
        Looper.prepare();

        sdkRequestHandler = App.getHandler(context);

        BhapticsModule.initialize(MainActivity.getActivity());

        BhapticsManager bhapticsManager = BhapticsModule.getBhapticsManager();

        bhapticsManager.addBhapticsManageCallback(new BhapticsManagerCallback() {
            @Override
            public void onDeviceUpdate(List<BhapticsDevice> list) {
                getDev();
            }

            @Override
            public void onChangeResponse() {getDev();}

            @Override
            public void onConnect(String s) {getDev(); sendEvent("onConnect","Connected");}

            @Override
            public void onDisconnect(String s) {getDev(); sendEvent("onDisconnect","Disconnect");}
        });
    }

    @Override
    public String getName() {
        return "BhapticModuleJava";
    }

    public void getDev() {
        for (SimpleBhapticsDevice simpleBhapticsDevice : sdkRequestHandler.getDeviceList()) {
            WritableMap payload = Arguments.createMap();

            payload.putString("name", simpleBhapticsDevice.getDeviceName());
            payload.putString("battery", String.valueOf(simpleBhapticsDevice.getBattery()));
            payload.putString("addr", simpleBhapticsDevice.getAddress());
            payload.putString("paired", String.valueOf(simpleBhapticsDevice.isPaired()));
            payload.putString("type", SimpleBhapticsDevice.positionToString(simpleBhapticsDevice.getPosition()));
            payload.putString("status", simpleBhapticsDevice.isConnected() ? "Connected" : "Disconnected");

            if(mEmitter==null) {
                mEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
            }
            if(mEmitter != null ){
                mEmitter.emit("onUpdateDevices",payload);
            }
        }
    }

    public void sendEvent(String eventName, String message) {
        if(mEmitter==null) {
            mEmitter = getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
        }
        if(mEmitter != null ){
            mEmitter.emit(eventName,message);
        }
    }

    @ReactMethod
    public void connectBhapticsDevice() {
        for (SimpleBhapticsDevice simpleBhapticsDevice : sdkRequestHandler.getDeviceList()) {
            sdkRequestHandler.enableDevice(simpleBhapticsDevice.getAddress(), true);
        }
    }

    @ReactMethod
    public void BhapticregisterFile(String key, String content) {
        sdkRequestHandler.register(key, content);
    }

    @ReactMethod
    public void BhapticSubmit(String key, float intensity, float duration) {
        sdkRequestHandler.submitRegistered(key, key, intensity, duration, 0, 0);
    }



    @ReactMethod
    public void getHapticList() {
        getDev();
    }

}
