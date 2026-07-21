/* //Percy */

import styles from "./PhotoGallery.module.css";

//Add your photos here. Drop image files into client/public/ and list them below.
//Leave src as "" for an empty "Add photo" placeholder slot.
const photos = [
  { src: "/pug1.jpeg", caption: "Potato chomping" },
  { src: "/pug2.jpg", caption: "" },
  { src: "/pug3.jpg", caption: "Potato and Hazel Burritos" },
  { src: "/pug4.jpg", caption: "" },
  { src: "/pug5.jpg", caption: "Potato half asleep" },
  { src: "/pug6.jpg", caption: "Potato fully asleep" },
  { src: "/pug7.jpg", caption: "Hazel lookin cute" },
  { src: "/pug8.jpg", caption: "Potato staring into my soul" },
  { src: "/pug9.jpg", caption: "The most cozy Hazel" },
  { src: "/pug10.jpg", caption: "" },
  { src: "/pug11.jpg", caption: "Staring into your soul" },
  { src: "/pug12.jpg", caption: "" },
  { src: "/pug13.jpg", caption: "Hazel being cute" },
  { src: "/pug14.jpg", caption: "Potato side eyeing" },
  { src: "/us1.jpg", caption: "Póg 2026" },
  { src: "/us2.jpg", caption: "Kerry 2026" },
  { src: "/us3.jpg", caption: "Wilde 2026" },
  { src: "/us4.jpg", caption: "Beach Picnic 2026" },
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
