import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useContext, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";
import { AuthContext } from "../../context/auth";
import { LOGIN_GET_MESSAGE, LOGIN_VERIFY } from "../../graphql";


export const SigninBtn = ({handleOnClick}) => {
    let [paint, setPaint] = useState("#ffffff");
    const {setAccessToken, connectWallet, checkNetwork, setLogin} = useContext(AuthContext)
    const [loginGetMessage] = useMutation(LOGIN_GET_MESSAGE)
    const [loginVerify] = useMutation(LOGIN_VERIFY)
    const [loading, setLoading] = useState(false)
    const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const handleClick = async() => {
        try {
          setLoading(true)
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
      setLoading(false)
      setLogin(true)
        } catch (e) {
            const message = e.message
            console.error(e);
            setLoading(false)
        }
    
}
   
    return (
         <div className="grid place-items-center">
      <button className={`p-5 md:p-3 bg-blue-500 hover:bg-blue-600 text-xl font-semibold rounded-xl w-full text-white cursor-pointer overflow-hidden`} onClick={handleClick}>{loading ? 
      <HashLoader
        color={paint}
        loading={loading}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : "Log In"}
      
      </button>

      
    </div>
    )
}

