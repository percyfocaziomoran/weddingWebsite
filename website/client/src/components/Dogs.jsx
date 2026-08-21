//Percy
//A page celebrating the pups. Edit the dogs array to change photos and bios.

import styles from "./Dogs.module.css";

const dogs = [
  {
    name: "Hazel",
    photo: "/pug7.jpg",
    tagline: "Mischievious Pretty Princess",
    bio: "Anyone who has met Hazel knows she is a person in hiding, and a chocolate loving one at that. Hazel is a cuddly and opinionated pug who is ready to tell you her thoughts if you're 5 minutes late with her dinner or if you haven't given her enough pets.",
  },
  {
    name: "Potato",
    photo: "/pug1.jpeg",
    tagline: "The Jester",
    bio: "Potato and his tongue have one brain cell between them. Potato is a snuggley baby who prefers to be within 10 cm of 'Dad' Percy at all times, but 'Papa' Elliott will do if Dad isn't available (after a few screams). ",
  },
  {
    name: "Fudge",
    photo: "/fudgetp.jpg",
    tagline: "The Energizer Bunny",
    bio: "Fudge is an energetic and excitable 'fug' (fake pug, or Fudge pug) who strongly believes she is dating Hazel (Hazel is not sure of this). Elliott told Percy that Fudge would calm down after the first time they met... that was years ago.",
  },
];

function Dogs() {
  return (
    <section className={styles.dogs}>
      <h1>Our Dogs</h1>
      <p className={styles.intro}>The real stars of the show</p>

      <div className={styles.grid}>
        {dogs.map((dog) => (
          <div className={styles.card} key={dog.name}>
            <img src={dog.photo} alt={dog.name} className={styles.photo} />
            <h2 className={styles.name}>{dog.name}</h2>
            <p className={styles.tagline}>{dog.tagline}</p>
            <p className={styles.bio}>{dog.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dogs;
