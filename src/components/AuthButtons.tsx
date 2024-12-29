import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient, defineChain } from "thirdweb";

const AuthButtons = () => {
  const client = createThirdwebClient({
    clientId: "6e34f4b39e6ea9912d521e4256c6601d",
  });
  const chainId = defineChain(656476);

  return (
    <div className="space-y-4">
      <ConnectButton chain={chainId} client={client} />
    </div>
  );
};

export default AuthButtons;
