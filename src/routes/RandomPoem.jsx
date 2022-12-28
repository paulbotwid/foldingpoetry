import { useEffect, useState } from "react";
import SinglePoem from "../components/SinglePoem";
import getRandomPoem from "../hooks/getRandomPoem";

export default function RandomPoem() {

    const {randomPoem, loading} = getRandomPoem()

    return (
        <>
        {randomPoem && <SinglePoem loading={loading} poem={randomPoem} />}
        </>
    )
}