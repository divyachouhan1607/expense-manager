package in.kharchasaathi.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handleDeepLink(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleDeepLink(intent);
    }

    private void handleDeepLink(Intent intent) {
        if (intent == null || intent.getData() == null) return;

        Uri uri = intent.getData();
        if (!"in.kharchasaathi.app".equals(uri.getScheme())) return;

        String accessToken = uri.getQueryParameter("access_token");
        String refreshToken = uri.getQueryParameter("refresh_token");

        if (accessToken != null && refreshToken != null) {
            // Navigate WebView to the set-session page with tokens
            String url = "https://kharcha-saathi.vercel.app/auth/set-session"
                    + "?access_token=" + Uri.encode(accessToken)
                    + "&refresh_token=" + Uri.encode(refreshToken);

            getBridge().getWebView().post(() -> {
                getBridge().getWebView().loadUrl(url);
            });
        }
    }
}
