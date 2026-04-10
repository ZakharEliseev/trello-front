import { GoogleLogin } from "@react-oauth/google";

import { RoutePath } from "../../../../../routes/config";
import { authApi } from "../../../api/auth";

const GoogleAuthBtn = () => {
  const [googleLogin] = authApi.useGoogleLoginMutation();

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        if (!credentialResponse.credential) {
          return;
        }
        googleLogin({ idToken: credentialResponse.credential })
          .unwrap()
          .then((res) => {
            localStorage.setItem("token", res.token);
            window.location.href = RoutePath.boards();
          });
      }}
      onError={() => alert("Ошибка Google Login компонента")}
      text="continue_with"
      size="large"
      theme="outline"
      width={320}
      logo_alignment="center"
    />
  );
};

export default GoogleAuthBtn;
