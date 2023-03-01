import { Contract, ethers } from 'ethers';
import React, { useContext, useState } from 'react'
import { PROFILE_NFT_ABI, PROFILE_NFT_ADDRESS } from '../../constants';
import { AuthContext } from '../../context/auth'
import { pinJSONToIPFS } from '../../helpers/function';

const CreateProfile = ({}) => {
const {indexingProfiles, setIndexingProfiles, connectWallet, checkNetwork} = useContext(AuthContext);
const [handle, setHandle] = useState("")
const [avatar, setAvatar] = useState("")
const [name, setName] = useState("")
const [bio, setBio] = useState("")
const [operator, setOperator] = useState("")

const handleOnClick = async ({handle, avatar, name, bio}) => {
    try { 

    const provider = await connectWallet();
    console.log(provider);

    await checkNetwork(provider);
    
// https://calendly.com/debbie-ly/cyberconnect-hackathon-lit-office-hours?month=2023-02

// https://calendly.com/debbie-ly/cyberconnect-hackathon-lit-office-hours?back=1&month=2023-02 
    /**Construct metadata schema */
    const metadata = {
        name: name,
        bio: bio,
        handle: handle,
        version: "1.0.0",
    };
    /**Upload metadata to IPFS */
    const ipfsHash = await pinJSONToIPFS(metadata);
    console.log("Hello Favor");


    const signer = provider.getSigner();

    const address = await signer.getAddress();

    const contract = new Contract(
        PROFILE_NFT_ADDRESS,
        PROFILE_NFT_ABI,
        signer
    );
    console.log(contract);

    const tx =await contract.createProfile(
        /**CreateProfileParams */
        {
            to: address,
            handle: handle,
            metadata: metadata,
            avatar: avatar,
            operator: "0x85AAc6211aC91E92594C01F8c9557026797493AE"
        },
        0x0,
        0x0
    );

    await tx.wait();


    const profileID = await contract.getProfileIdByHandle(handle);

    setIndexingProfiles([
        ...indexingProfiles,
        {
            profileID: Number(profileID),
            handle: profileHandle,
            avatar: profileAvatar,
            metadata: ipfsHash,
            isIndexed: false,
        },
    ]);


    console.log("~~ Tx hash ~~");
    console.log(tx.hash);
} catch (e) {
    setIndexingProfiles([...indexingProfiles]);
    const message = e.message;
}
    
}
const param = {
handle:handle, avatar:avatar, name:name, bio:bio, operator:operator
}
  return (
    <div className='createProfile' style={{display:'flex', flexDirection: 'column'}}>
<div style={{display:'flex', flexDirection: 'column', height: '50vh', justifyContent: 'space-around'}}>
    <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@handle" />
    <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="@Avatar" />
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={"@Name"} />
    <textarea type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="@Bio" cols={"30"} rows="10" />
</div>
    <button onClick={() => handleOnClick(param)}>CreateProfile</button>
    </div>
    
  )
}

export default CreateProfile