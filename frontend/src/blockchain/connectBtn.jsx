import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoSettingsOutline } from 'react-icons/io5'
export const CustomWalletBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted !== "loading";
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className="bg-[#3aafa9] flex justify-center items-center gap-2 text-white rounded-md px-4 py-2">
                    Connect Wallet
                    <IoSettingsOutline className='text24' />
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className=" bg-[#dc0000] text-white rounded-md px-4 py-2">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }} className=" justify-center items-center">
                  <button onClick={openAccountModal} type="button" className="bg-[#3aafa9] text-white hidden md:block rounded-md px-4 py-2">
                    {account.displayName}
                  </button>
                  <img
                    className=" h-8 rounded-full md:hidden "
                    src="partners/user.png"
                    alt="user"
                    onClick={openAccountModal}
                  />
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 32,
                          height: 32,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 32, height: 32 }}
                          />
                        )}
                      </div>
                    )}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
