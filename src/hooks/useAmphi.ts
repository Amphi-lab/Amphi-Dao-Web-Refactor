import { useContractRead, useContractWrite } from 'wagmi';

import { mainABI } from './MAIN.json';

/*
  CROWD FACTORY
*/

// export function useAmphiFactoryContract() {
//     const contract = useContract({
//         address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS,
//         abi: contractABI
//     });

//     return contract;
// }

// create a generic hook to access write functions of contract
export function useAmphiFactoryFunctionWriter(
    functionName: string
): ReturnType<typeof useContractWrite> {
    const contractWrite = useContractWrite({
        address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS,
        abi: mainABI,
        functionName
        // mode: 'recklesslyUnprepared'
    });
    // debugger;
    return contractWrite;
}

export interface useAmphiFactoryFunctionReaderProps {
    functionName: string;
    args?: any[];
}
// create a generic hook to access read functions of contract
export function useAmphiFactoryFunctionReader({
    functionName
}: useAmphiFactoryFunctionReaderProps): ReturnType<typeof useContractRead> {
    const contractRead = useContractRead({
        address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS,
        abi: mainABI,
        functionName,
        watch: true
    });

    return contractRead;
}
