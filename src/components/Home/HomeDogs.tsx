import { useState } from "react";
import axios from "axios";

interface DogsResponse {
    message: Array<string>;
    status: string;
}

function HomeDogs() {
    const [data, setData] = useState<DogsResponse>();
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchDogImages() {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://dog.ceo/api/breeds/image/random/20"
            );
            const dogsResponse: DogsResponse = response.data;
            setData(dogsResponse);
        } catch (error: any) {
            console.error(error);
            setData({ message: [error.message], status: "failed" });
        }
        setLoading(false);
    }

    return (
        <div>
            <button
                onClick={fetchDogImages}
                className="p-4 bg-slate-800 text-slate-200 m-2 text-2xl rounded-xl"
            >
                Generate Random Dog Images
            </button>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 container mx-auto">
                        {data && data.status === "failed" ? (
                            <div>Error: {data.message[0]}</div>
                        ) : (
                            data &&
                            data.message.map((dogImage, index) => (
                                <div key={index} className="square-image m-auto">
                                    <img src={dogImage} alt="Dog" />
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeDogs;
