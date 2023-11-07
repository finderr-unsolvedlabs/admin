import React from "react";

type Props = {};

const TextWelcome = (props: Props) => {
  return (
    <div className="mt-5 mb-11">
      <h2 className="text-center text-brand text-xl font-bold tracking-wide mb-3">
        WELCOME TO FINDERR
      </h2>
      <p className="text-center text-[15px]">
        Your go-to app for discovering nearby stores and trying out products
        in-person, exclusively in Jaipur! With Finderr, you can easily locate
        exclusive stores & experience their offerings first-hand. Elevate your
        shopping experience. Shop local and smart with Finderr today!
      </p>
    </div>
  );
};

export { TextWelcome };
