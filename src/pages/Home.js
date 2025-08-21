import { useContext, useState } from "react";
import { DiaryStateContext } from "../../../project3/src/App";
import Header from "../components/Header";


const Home = () => {
   
    return(
        <div>
            <Header
            title={'header'}
            leftChild={'ee'}
            rightChild={'aa'}
            />
        </div>
    )
}
export default Home;