"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRentModal } from "@/hooks/useRentModal";
import Modal from "../Modal";
import Category from "./Category";
import Info from "./Info";
import Location from "./Location";
import Photos from "./Photos";
import Description from "./Description";
import Price from "./Price";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  PHOTOS = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const { handleSubmit, watch, setValue } = useForm();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const rentModal = useRentModal();

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const bodyContent = {
    [STEPS.CATEGORY]: (
      <Category onSelectCategory={setCustomValue} selectedCategory={category} />
    ),
    [STEPS.LOCATION]: (
      <Location location={location} setSelectedLocation={setCustomValue} />
    ),
    [STEPS.INFO]: (
      <Info
        guestCount={guestCount}
        setCustomValue={setCustomValue}
        roomCount={roomCount}
        bathroomCount={bathroomCount}
      />
    ),
    [STEPS.PHOTOS]: <Photos />,
    [STEPS.DESCRIPTION]: <Description />,
    [STEPS.PRICE]: <Price />,
  };

  const onNext = () => {
    if (step < STEPS.PRICE) setStep(step + 1);
  };
  const onBack = () => {
    if (step > STEPS.CATEGORY) setStep(step - 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  const onSubmit = () => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
  };

  return (
    <Modal
      onClose={rentModal.close}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={rentModal.isOpen}
      title="Airbnb your home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      body={bodyContent[step]}
    />
  );
};

export default RentModal;
