import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
//import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-2c077-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  // const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  // const [meals, setMeals] = useState([]);

  // useEffect(() => {
  //   const transformMeals = (mealsObj) => {
  //     const loadedMeals = [];

  //     for (const mealKey in mealsObj) {
  //       loadedMeals.push({
  //         id: mealKey,
  //         name: mealsObj[mealKey].name,
  //         description: mealsObj[mealKey].description,
  //         price: mealsObj[mealKey].price,
  //       });
  //     }

  //     setMeals(loadedMeals);
  //   };

  //   fetchMeals(
  //     {
  //       url: "https://react-http-2c077-default-rtdb.firebaseio.com/meals.json",
  //     },
  //     transformMeals
  //   );
  // }, [fetchMeals]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = <ul>{mealsList}</ul>;

  // if (error) {
  //   content = error;
  // }

  // if (isLoading) {
  //   content = "Loading meals...";
  // }

  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
