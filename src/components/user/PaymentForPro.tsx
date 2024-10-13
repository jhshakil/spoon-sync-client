"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useProPayment } from "@/hooks/payment.hook";
import { formatISO } from "date-fns";

const AllPlane = [
  {
    name: "1 Month",
    value: "30",
    price: "5",
  },
  {
    name: "6 Month",
    value: "180",
    price: "25",
  },
  {
    name: "1 Year",
    value: "365",
    price: "50",
  },
];

type Props = {
  email: string;
};

const PaymentForPro = ({ email }: Props) => {
  const [selectedPlane, setSelectedPlane] = useState(AllPlane[0]?.value);

  const { mutate: makePayment, data: paymentData } = useProPayment();

  const submit = (plane: string) => {
    const payment = AllPlane.find((el) => el.value === plane);
    const today = new Date();
    const data = {
      email,
      duration: `${formatISO(
        new Date(new Date().setDate(today.getDate() - Number(payment?.value)))
      )}`,
      payment: payment?.price as string,
    };

    makePayment(data);
  };

  if (paymentData && paymentData?.data?.payment_url) {
    window.location.href = paymentData?.data?.payment_url;
  }
  return (
    <div>
      <h2 className="text-2xl">Make a payment for Pro</h2>
      <div className="mt-5">
        <p>Please select a plane</p>
        <Select
          value={AllPlane[0]?.value}
          onValueChange={(value) => setSelectedPlane(value)}
        >
          <SelectTrigger className="mt-3">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {AllPlane?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name} only {item.price}$
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5 flex justify-between gap-4">
        <Link
          href={`/user/profile`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Cancel
        </Link>
        <Button onClick={() => submit(selectedPlane)}>Pay Now</Button>
      </div>
    </div>
  );
};

export default PaymentForPro;
