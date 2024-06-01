import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
const RateOffer = ({ rate, setRate }) => {
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={index}>
            <Radio
              key={index}
              type="radio"
              value={givenRating}
              onClick={() => {
                setRate(givenRating);
              }}
            />
            <Rating>
              <FaStar
                key={index}
                color={
                  givenRating < rate || givenRating === rate
                    ? "var(--main-gradient)"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default RateOffer;
