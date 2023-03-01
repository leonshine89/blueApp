import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { LOGIN_GET_MESSAGE, LOGIN_VERIFY } from "../../graphql";


export const SigninBtn = () => {
    const {setAccessToken, connectWallet, checkNetwork, setLogin} = useContext(AuthContext)
    const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE)
    const [loginVerify] = useMutation(LOGIN_VERIFY)

    const handleOnClick = async () => {
        try {
            const provider = await connectWallet();

            await checkNetwork(provider);

            const signer = provider.getSigner();

            const account = await signer.getAddress();

            const network = await provider.getNetwork();

                const messageResult = await loginGetMessage({
        variables: {
          input: {
            address: account,
            domain: "xxxxxxx.xxx",
          },
        },
      });
      const message = messageResult?.data?.loginGetMessage?.message;
      console.log(message);

      // get the signature for the message signed with the wallet
      const signature = await signer.signMessage(message);

      // verify the signature on the server and get the access token
      const accessTokenResult = await loginVerify({
        variables: {
          input: {
            address: account,
            domain: "xxxxxxx.xxx",
            signature: signature,
          },
        },
      });

      const accessToken = accessTokenResult?.data?.loginVerify?.accessToken;

      console.log("~~ Access Token ~~");
      console.log(accessToken);

      /**Save the access token in local storage */
      localStorage.setItem("accessToken", accessToken);

      setAccessToken(accessToken);

      window.alert("success", "You are now logged in!")
      setLogin(true)
        } catch (e) {
            const message = e.message
            console.error(e);
            window.alert("error message")
        }
    }
    return (
        <button className="" onClick={handleOnClick}>
            Sign In
        </button>
    )
}

