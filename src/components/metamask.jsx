import { ConnectWallet } from "@thirdweb-dev/react";


function Metamask() {
  return (

    <div>

      <div className="connect">
        <ConnectWallet colorMode="dark" />
        <br /> <br /> <br />
      </div>

    </div>


  );
}

export default Metamask;; 