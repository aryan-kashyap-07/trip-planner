import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: "user",
            parts: [
              {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
            ],
          },
          {
            role: "model",
            parts: [
              {text: "```json\n{\n  \"hotels\": [\n    {\n      \"name\": \"The D Las Vegas\",\n      \"address\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"from $35 per night\",\n      \"imageUrl\": \"https://www.the-d.com/sites/default/files/styles/hotel_header/public/hotel_header_images/the_d_hotel_exterior.jpg?itok=4aNqQ77t\",\n      \"geoCoordinates\": \"36.1699, -115.1423\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street Experience. It features a casino, several dining options, and a rooftop pool.\"\n    },\n    {\n      \"name\": \"Golden Nugget Las Vegas\",\n      \"address\": \"129 E Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"from $45 per night\",\n      \"imageUrl\": \"https://www.goldennugget.com/las-vegas/images/default-source/hotel-landing-page/hotel-landing-page-header.jpg?sfvrsn=40958f39_0\",\n      \"geoCoordinates\": \"36.1696, -115.1416\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A historic hotel with a casino, several restaurants, and a world-famous shark tank. It's located on Fremont Street and offers a lively atmosphere.\"\n    },\n    {\n      \"name\": \"Plaza Hotel & Casino\",\n      \"address\": \"1 Main Street, Las Vegas, NV 89101\",\n      \"price\": \"from $50 per night\",\n      \"imageUrl\": \"https://www.plazahotelcasino.com/sites/default/files/styles/hero/public/hero-images/exterior-hero.jpg?itok=h8y2oE-7\",\n      \"geoCoordinates\": \"36.1699, -115.1423\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A classic hotel with a casino, dining options, and a rooftop pool. It's located on Fremont Street and offers a good value for money.\"\n    },\n    {\n      \"name\": \"Circus Circus Hotel & Casino\",\n      \"address\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"from $30 per night\",\n      \"imageUrl\": \"https://www.circuscircus.com/content/dam/circusircus/hero/circus-circus-hero-desktop.jpg\",\n      \"geoCoordinates\": \"36.1078, -115.1724\",\n      \"rating\": \"3 stars\",\n      \"description\": \"A family-friendly hotel with a casino, a circus theme, and a variety of entertainment options.\"\n    }\n  ],\n  \"itinerary\": [\n    {\n      \"day\": \"Day 1\",\n      \"plan\": [\n        {\n          \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall with a canopy of lights, live music, street performers, and numerous casinos. It's a vibrant and lively atmosphere, perfect for people watching.\",\n          \"placeImageUrl\": \"https://www.vegasexperience.com/media/images/fremont-street-experience.jpg\",\n          \"geoCoordinates\": \"36.1699, -115.1423\",\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"3 hours\"\n        },\n        {\n          \"time\": \"Afternoon (12:00 PM - 2:00 PM)\",\n          \"placeName\": \"Heart Attack Grill\",\n          \"placeDetails\": \"A unique restaurant known for its outrageous burgers and the 'calorie-counting' theme. It's a fun and quirky experience.\",\n          \"placeImageUrl\": \"https://www.theheartattackgrill.com/images/heart-attack-grill-las-vegas.jpg\",\n          \"geoCoordinates\": \"36.1706, -115.1424\",\n          \"ticketPricing\": \"Based on menu\",\n          \"timeTravel\": \"2 hours\"\n        },\n        {\n          \"time\": \"Evening (6:00 PM - 9:00 PM)\",\n          \"placeName\": \"Neon Museum\",\n          \"placeDetails\": \"A museum showcasing vintage neon signs from Las Vegas's history. It's a fascinating look at the city's evolution and iconic signage.\",\n          \"placeImageUrl\": \"https://www.neonmuseum.org/wp-content/uploads/2023/01/NeonMuseum-Sign-Photo-5433-scaled.jpg\",\n          \"geoCoordinates\": \"36.1544, -115.1419\",\n          \"ticketPricing\": \"$20 - $30\",\n          \"timeTravel\": \"3 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2\",\n      \"plan\": [\n        {\n          \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n          \"placeName\": \"The Strip\",\n          \"placeDetails\": \"The iconic main drag of Las Vegas, lined with casinos, resorts, and entertainment venues. It's a must-visit for its dazzling lights, bustling atmosphere, and iconic landmarks.\",\n          \"placeImageUrl\": \"https://www.visitlasvegas.com/sites/default/files/styles/hero/public/2021-08/the-strip-2021-08.jpg?itok=lU00J6D5\",\n          \"geoCoordinates\": \"36.1149, -115.1731\",\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"3 hours\"\n        },\n        {\n          \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A stunning botanical garden featuring elaborate floral displays that change seasonally. It's a peaceful oasis amidst the hustle and bustle of the Strip.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/bellagio-website/images/conservatory/conservatory-hero.jpg\",\n          \"geoCoordinates\": \"36.1146, -115.1753\",\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"3 hours\"\n        },\n        {\n          \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n          \"placeName\": \"Fountains of Bellagio\",\n          \"placeDetails\": \"A spectacular water and light show synchronized to music, held in front of the Bellagio Hotel. It's a captivating performance that's free to watch.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/bellagio-website/images/fountains/fountains-hero.jpg\",\n          \"geoCoordinates\": \"36.1146, -115.1753\",\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"3 hours\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3\",\n      \"plan\": [\n        {\n          \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A scenic area with stunning red rock formations, hiking trails, and scenic drives. It's a great place to escape the city and enjoy the natural beauty of Nevada.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/learn/nature/images/red-rock-canyon-scenic-drive-1.jpg\",\n          \"geoCoordinates\": \"36.2276, -115.2450\",\n          \"ticketPricing\": \"$15 per vehicle\",\n          \"timeTravel\": \"3 hours\"\n        },\n        {\n          \"time\": \"Afternoon (12:00 PM - 3:00 PM)\",\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A massive concrete arch-gravity dam on the Colorado River, a marvel of engineering and a popular tourist destination.\",\n          \"placeImageUrl\": \"https://www.nps.gov/hdam/learn/nature/images/hoover-dam-from-above-looking-downstream.jpg\",\n          \"geoCoordinates\": \"36.0149, -114.9108\",\n          \"ticketPricing\": \"Free for dam viewing, tours available for a fee\",\n          \"timeTravel\": \"3 hours\"\n        },\n        {\n          \"time\": \"Evening (7:00 PM - 9:00 PM)\",\n          \"placeName\": \"Linq Promenade\",\n          \"placeDetails\": \"An outdoor shopping and entertainment complex with restaurants, bars, shops, and a giant observation wheel.\",\n          \"placeImageUrl\": \"https://www.caesars.com/content/dam/caesars-entertainment/linq/hero-images/linq-promenade-hero-image.jpg\",\n          \"geoCoordinates\": \"36.1098, -115.1721\",\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"2 hours\"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* This itinerary is a suggested framework, and you can customize it based on your interests.\n* The hotel prices are approximate and can vary depending on the season and availability.\n* You can find cheaper alternatives to the suggested restaurants and activities.\n* Remember to check the opening hours and ticket prices before visiting any attraction.\n* It's always recommended to book your hotels and tours in advance, especially during peak season. \n"},
            ],
          },
        ],
      });
  
    
  
  