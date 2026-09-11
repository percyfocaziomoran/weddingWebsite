/* //Percy */

import styles from "./PhotoGallery.module.css";

//Add your photos here. Drop image files into client/public/ and list them below.
//Leave src as "" for an empty "Add photo" placeholder slot.
const photos = [
  { src: "/pug1.jpeg", caption: "Potato chomping" },
  { src: "/pug2.jpg", caption: "" },
  { src: "/fudge1.jpg", caption: "" },
  { src: "/pug3.jpg", caption: "Potato and Hazel Burritos" },
  { src: "/fudge2.jpg", caption: "Pretty princess Fudge" },
  { src: "/pug4.jpg", caption: "" },
  { src: "/pug5.jpg", caption: "Potato half asleep" },
  { src: "/pug6.jpg", caption: "Potato fully asleep" },
  { src: "/fudge8.jpg", caption: "" },

  { src: "/fudge3.jpg", caption: "blep" },
  { src: "/pug7.jpg", caption: "Hazel lookin cute" },
  { src: "/pug8.jpg", caption: "Potato staring into my soul" },
  { src: "/fudge4.jpg", caption: "" },

  { src: "/pug9.jpg", caption: "The most cozy Hazel" },
  { src: "/fudge5.jpg", caption: "All by herselfffff" },

  { src: "/pug10.jpg", caption: "" },

  { src: "/pug11.jpg", caption: "Staring into your soul" },
  { src: "/pug12.jpg", caption: "" },
  { src: "/fudge6.jpg", caption: "Fudge when she sees a hand" },

  { src: "/pug13.jpg", caption: "Hazel being cute" },
  { src: "/pug14.jpg", caption: "Potato side eyeing" },
  { src: "/fudge7.jpg", caption: "" },
  { src: "/fudgegaggy.jpg", caption: "" },

  { src: "/us1.jpg", caption: "Póg 2026" },
  { src: "/us2.jpg", caption: "Kerry 2026" },
  { src: "/us3.jpg", caption: "Wilde 2026" },
  { src: "/us4.jpg", caption: "Beach Picnic 2026" },

  { src: "marrymephoto.jpg", caption: "Percy's proposal picnic" },
  { src: "marrymedistant.jpg", caption: "" },
  { src: "loughhyne1.jpg", caption: "Elliott's proposal location: Lough Hyne" },
];

function PhotoGallery() {
  return (
    <section className={styles.photos}>
      <h1>Photo Gallery</h1>
      <p className={styles.intro}></p>

      <div className={styles.grid}>
        {photos.map((photo, i) =>
          photo.src ? (
            <figure className={styles.tile} key={i}>
              <img
                src={photo.src}
                alt={photo.caption || ""}
                className={styles.photo}
              />
              {photo.caption && (
                <figcaption className={styles.caption}>
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ) : (
            <div className={styles.placeholder} key={i}>
              Add photo
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export default PhotoGallery;
