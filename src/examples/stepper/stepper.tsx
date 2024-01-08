import { Step, Stepper } from "../../components/stepper";
import { delay, randomFromInterval } from "../../utils";
import { EnterAddress, EnterComment, ReviewInformation, SelectCity, SelectCountry, SuccessScreen } from "./steps";
import { Data } from "./types";

const citiesByCountry: Record<string, string[] | null> = {
  USA: ["New York", "Los Angeles", "Chicago"],
  Canada: ["Toronto", "Vancouver", "Montreal"],
  Mexico: ["Mexico City", "Guadalajara", "Monterrey"],
  Japan: [],
  Brazil: null,
};

const order: Record<string, number> = {
  "select-country": 0,
  "select-city": 1,
  "select-address": 2,
  "add-comment": 3,
  "review-information": 4,
  finish: 5,
};

const handlers: Record<string, (data: Data) => Promise<Data>> = {
  "select-country": async (data: Data) => {
    await delay(randomFromInterval(1000, 4000));

    return { ...data, countries: ["USA", "Canada", "Mexico", "Japan", "Brazil"] };
  },
  "select-city": async (data: Data) => {
    await delay(randomFromInterval(1000, 4000));

    const cities = data.selectedCountry ? citiesByCountry[data.selectedCountry] : null;
    if (cities === null) {
      throw new Error("Server error: Error fetching cities for selected country");
    }
    return { ...data, cities };
  },
  "select-address": async (data: Data) => {
    await delay(randomFromInterval(1000, 4000));

    return { ...data };
  },
  "add-comment": async (data: Data) => {
    await delay(randomFromInterval(1000, 4000));

    if (data.address?.includes("Error address")) {
      throw new Error("Server error: Invalid address");
    }
    return { ...data };
  },
  "review-information": async (data: Data) => {
    await delay(randomFromInterval(1000, 4000));

    if (Math.random() > 0.5) {
      throw new Error("Server error: something went wrong");
    }
    return { ...data };
  },
  finish: async (data: Data) => {
    await delay(randomFromInterval(1000, 4000));

    if (Math.random() > 0.1) {
      return {
        ...data,
        result: {
          ok: false,
          message: "Something went wrong",
        },
      };
    }

    return {
      ...data,
      result: {
        ok: true,
        message: "Success",
      },
    };
  },
};

type Props = { onSubmit?: () => void; onCancel?: () => void };
export const StepperExample = ({ onSubmit, onCancel }: Props) => {
  const handleChange = async (nextID: string, prevID: string, data: Data | null) => {
    const isBack = order[nextID] < order[prevID];

    if (isBack && data != null) {
      return data;
    }

    return handlers[nextID](data || {});
  };

  return (
    <Stepper initialStepId="select-country" onCancel={onCancel} onSubmit={onSubmit} onChange={handleChange}>
      <Step id="select-country">
        <SelectCountry />
      </Step>
      <Step id="select-city">
        <SelectCity />
      </Step>
      <Step id="select-address">
        <EnterAddress />
      </Step>
      <Step id="add-comment">
        <EnterComment />
      </Step>
      <Step id="review-information">
        <ReviewInformation />
      </Step>
      <Step id="finish">
        <SuccessScreen />
      </Step>
    </Stepper>
  );
};
