require("dotenv").config();

const { DATABASE_URL } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize.query(`
       

    DROP TABLE if EXISTS info;
    DROP TABLE if EXISTS comments;
    DROP TABLE if EXISTS controls;
    DROP TABLE if EXISTS brands;



    CREATE TABLE brands (
        brand_id SERIAL PRIMARY KEY,
        brand_name VARCHAR(100)
        
    );

    CREATE TABLE controls (
        control_id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        year VARCHAR(20),
        imageurl VARCHAR(50),
        href VARCHAR(50),
        brand_id INTEGER REFERENCES brands(brand_id)
    );

    CREATE TABLE info (
        info_id SERIAL PRIMARY KEY,
        control_id INTEGER REFERENCES controls(control_id),
        info_small VARCHAR(1000),
        info_large VARCHAR(4000)
    );

    CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        control_id INTEGER REFERENCES controls(control_id),
        comment VARCHAR(1000),
        commenter VARCHAR(50)
        
    );
    INSERT INTO brands (brand_name)
    VALUES ('Playstation'),
        ('Nintendo'),
        ('Xbox');

    INSERT INTO controls (name, year, imageurl, href, brand_id)
    VALUES ('PS5', 2020, '/ps5.png', 'hello', 1),
        ('PS1', 1994, '/ps1.png', '', 1),
        ('GameCube', 2001, '/gameCube.png', '', 2),
        ('N64', 1996, '/n64.png', '', 2),
        ('Xbox 360', 2005, '/xbox360.png', '', 3),
        ('Xbox Series X', 2020, '/seriesXG.png', '', 3);

    INSERT INTO comments (control_id, comment, commenter)
    VALUES (1, 'One of the best controllers made!', 'Juan T.'),
        (1, 'Still one of the best!', 'Juan T.'),
        (1, 'I was not kidding!', 'Juan T.'),
        (2, 'One of the first controllers that changed the game for me.', 'Juan T.'),
        (3, 'Here we go again with these bad controllers Nintendo, give me a break!!!', 'Juan T.'),
        (4, 'This control was horrendous, actually the worst one ever!', 'Juan T.'),
        (5, 'A controller not made for me, since I have tiny hands!!', 'Juan T.'),
        (6, 'They have created some of the best controllers out there, great job!!!', 'Juan T.');

    INSERT INTO info ( control_id, info_small, info_large)
    VALUES (1, 'Sony is moving beyond the DualShock line for the first time since the release of the Sixaxis. But unlike that controller, the DualSense doesnt initially seem to be that much of a departure from what came before.', 'The DualSense has much more advanced haptic feedback and adaptive triggers for the L2 and R2 buttons. The haptic feedback adds "a variety of powerful sensations youll feel when you play, such as the slow grittiness of driving a car through mud." The Adaptive triggers, meanwhile, will help you "feel the tension of your actions, like when drawing a bow to shoot an arrow." Additionally, the SHARE button from the DualShock 4 will be replaced by the CREATE button. The DualSense also features a two-toned design, a departure from previous controllers. The light bar will also now be found on either side of the touchpad.'),
        (2, 'PlayStation hit shelves and, along with the D-pad, came four shapes - triangle, circle, X and square - that, together, would visually represent a new global culture.', 'Sonys innovative additions to traditional controller design helped forever change the way we game. The first major addition was an extra set of shoulder buttons. This is also the controller that introduced the iconic Square, Triangle, Circle, Cross button layout for PlayStation controllers. This was the controller that introduced dual analog sticks to the PlayStation brand.'),
        (3, 'Released alongside the GameCube console, the standard GameCube controller has a wing grip design.', 'As the successor to the Nintendo 64 controller, it is the progression of Nintendos controller design in numerous ways. The contentious M-shaped design of its predecessor was replaced with a more conventional handlebar style controller shape; a second analog stick was added, replacing the C buttons with a C stick and the X and Y face buttons, last seen on the Super Nintendo controller, were reintroduced; the shoulder buttons were changed to hybrid analog triggers.'),
        (4, 'The N64 controller was simply bizarre from a design perspective. There wasnt really a controller like it before 1996, and there really hasnt been a controller like it since.', 'The N64s trident (or “Batarang,” as some call it) shape and somewhat strange A, B, and C button layout are certainly unusual, but when most people talk about the N64 controller being “weird,” theyre typically talking about the analog stick and Z-trigger placement. For a modern generation of gamers raised on the idea of being able to easily access a D-pad, analog sticks, and buttons at the same time, picking up an N64 controller for the first time must feel like a prank.'),
        (5, 'A part of the controllers legacy was its impact on PC gaming. With the continued rise of its gaming division, Microsoft sought to create a bridge between consoles and the PC marketplace with Games for Windows, bringing the Xbox experience to PC.', 'Turning the Xboxs black and white buttons into additional shoulder buttons for the 360 was one of the few changes made. Moving away from the previous controllers use of slots, a new audio plug-in for headsets and other add-ons like the messenger kit was placed on the bottom of the controller. The 360 controller also came in both wired and wireless variants, the latter of which used disposable batteries to power the device. The real game-changer of the controller was the guide button placed in the center of the device. With four LED lights around the circular 360 logo, it would not only signify which player number you were by a single lit quadrant, but it would also flash when the batteries would begin to run low. The guide button itself was tied to the next-gen experience of the 360, allowing players to travel the consoles hub to check up on friends, switch to other games, and interact with different apps on the console, such as the Xbox Marketplace and the budding movie-streaming service Netflix.'),
        (6, 'The new controller for Microsofts Xbox Series X continues nearly 20 years of development.', 'The new wireless controller features textured grips and triggers, an enhanced hybrid d-pad, and a standalone share button--allowing you to save screenshots and videos of your game sessions and upload them online. While the Xbox One had the option to share video and screenshots from your sessions, this is the first time an Xbox controller has its own dedicated button for saving and sharing content on the controller for it. The newest controller also features continued USB and Bluetooth support, making it usable for PC and even the current Xbox One as well.');
  `)
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};