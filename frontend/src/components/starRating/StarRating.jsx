import { useState } from 'react';
import { FaRegStar } from "react-icons/fa";


function StarRating({ totalStars = 5}) {
    const [rating, setRating] = useState(0)

    function handleStarClick(starValue) {
        if (rating === 1 && starValue === 1) {
            setRating(0)
            return
        }
        setRating(starValue)
    }

    return (
        <div>
            {
                [...Array(totalStars)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <label key={index} >
                            <input
                                type="radio"
                                name="rating"
                                value={starValue}
                                style={{ display: "none" }} onClick={() => handleStarClick(starValue)}
                            />
                            <FaRegStar
                                style={
                                    {
                                        width: "2rem",
                                        height: "2rem",
                                        cursor: "pointer"
                                    }
                                } color={starValue <= rating ? "rgb(199, 170, 5)" : "gray"}
                            />
                        </label>
                    )
                })
            }

        </div>
    )
}

export { StarRating }