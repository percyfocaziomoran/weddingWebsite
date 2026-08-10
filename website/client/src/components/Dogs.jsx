//Percy
//A page celebrating the pups. Edit the dogs array to change photos and bios.

import styles from "./Dogs.module.css";

const dogs = [
  {
    name: "Hazel",
    photo: "/pug7.jpg",
    tagline: "Cuddle specialist",
    bio: "Add Hazel's story here — favourite spots, walks, and mischief.",
  },
  {
    name: "Potato",
    photo: "/pug1.jpeg",
    tagline: "Chief snack inspector",
    bio: "Add Potato's story here — favourite treats, naps, and party tricks.",
  },
  {
    name: "Fudge",
    photo: "/pug.jpg",
    tagline: "Cuddle specialist",
    bio: "Add Fudge's story here — favourite spots, walks, and mischief.",
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
