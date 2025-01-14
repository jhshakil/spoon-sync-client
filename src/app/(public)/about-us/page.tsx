import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="bg-background px-8 py-12 rounded-lg">
      <h1 className="mb-8 text-4xl font-bold text-center">About Spoon Sync</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Spoon Sync</h2>
        <p className="text-lg mb-4">
          {`Welcome to Spoon Sync, your go-to hub for all things food! Whether
            you're a seasoned chef or just starting out in the kitchen, our
            community is a place where food lovers come together to share,
            discover, and enjoy delicious recipes from around the world.`}
        </p>
        <p className="text-lg mb-4">
          {`We believe that food is more than just sustenance – it's a way to
            connect, celebrate culture, and explore creativity. Our platform is
            built by passionate home cooks, professional chefs, and food
            enthusiasts who are eager to inspire others with their culinary
            creations.`}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Diverse Recipes",
              description:
                "From traditional family recipes to the latest food trends, we have something for everyone, whether you're cooking for a special occasion or looking for quick weeknight meals.",
            },
            {
              title: "Collaborative Cooking",
              description:
                "Share your own favorite recipes, give tips, and receive feedback from fellow members. We're all about learning and growing together!",
            },
            {
              title: "Food Stories",
              description:
                "Every recipe tells a story, and we encourage you to share the memories, culture, and inspiration behind your dishes.",
            },
            {
              title: "Healthy Eating",
              description:
                "Whether you are looking for plant-based, gluten-free, or low-carb options, you will find a variety of healthy and wholesome recipes to nourish your body and soul.",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          {`At Spoon Sync, everyone is welcome, regardless of skill level. So
            join us in this flavorful journey as we create, taste, and celebrate
            the joy of cooking. Let's make the world a tastier place, one recipe
            at a time!`}
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Happy Cooking!</h2>
      </section>
    </div>
  );
};

export default Page;
