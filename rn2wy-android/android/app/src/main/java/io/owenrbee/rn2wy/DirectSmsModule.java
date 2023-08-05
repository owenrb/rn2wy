package io.owenrbee.rn2wy;
 
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import android.telephony.SmsManager;
import com.facebook.react.bridge.Callback;

 
public class DirectSmsModule extends ReactContextBaseJavaModule {
 
    public DirectSmsModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }
 
    @Override
    //getName is required to define the name of the module represented in JavaScript
    public String getName() {
        return "DirectSms";
    }
 
    @ReactMethod
    public void sendDirectSms(String numbers, String msg, Callback callback) {
        String trace = "init";
        try {    
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(numbers, null, msg, null, null);   
            trace = "OK";
        } catch (Exception ex) {
            trace = ex.getMessage();
        }

        callback.invoke(trace);
    }
}