import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const UpgradeToProCard = () => {
  return (
    <Card className="w-full overflow-hidden rounded-lg border-0">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Get access all Premium Content
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/user/profile/upgrade-pro`}
          className={cn(buttonVariants(), "w-full")}
        >
          Upgrade Now
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UpgradeToProCard;
