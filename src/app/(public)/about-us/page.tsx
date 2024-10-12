const Page = () => {
  return (
    <div className="bg-background p-4 rounded-lg">
      <h1 className="text-[42px] text-center">About us</h1>
      <div className="mt-4 flex flex-col gap-4">
        <p>{`Welcome to Spoon Sync, your go-to hub for all things food! Whether you're a seasoned chef or just starting out in the kitchen, our community is a place where food lovers come together to share, discover, and enjoy delicious recipes from around the world.`}</p>
        <p>{`We believe that food is more than just sustenance – it’s a way to connect, celebrate culture, and explore creativity. Our platform is built by passionate home cooks, professional chefs, and food enthusiasts who are eager to inspire others with their culinary creations.`}</p>
        <div>
          <p>Here’s what you can expect from our community:</p>
          <ul className="list-disc px-7 mt-2">
            <li>
              <b>Diverse Recipes:</b> From traditional family recipes to the
              latest food trends, we have something for everyone, whether you’re
              cooking for a special occasion or looking for quick weeknight
              meals.
            </li>
            <li>
              <b>Collaborative Cooking:</b> Share your own favorite recipes,
              give tips, and receive feedback from fellow members. We’re all
              about learning and growing together!
            </li>
            <li>
              <b>Food Stories:</b> Every recipe tells a story, and we encourage
              you to share the memories, culture, and inspiration behind your
              dishes.
            </li>
            <li>
              <b>Healthy Eating:</b> Whether you are looking for plant-based,
              gluten-free, or low-carb options, you will find a variety of
              healthy and wholesome recipes to nourish your body and soul.
            </li>
          </ul>
        </div>
        <p>
          At Spoon Sync, everyone is welcome, regardless of skill level. So join
          us in this flavorful journey as we create, taste, and celebrate the
          joy of cooking. Let’s make the world a tastier place, one recipe at a
          time!
        </p>
        <p>Happy Cooking!</p>
      </div>
    </div>
  );
};

export default Page;
