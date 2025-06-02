import React, { useEffect, useState } from 'react'


const Text = () => {

  // const sentence1 = "Oh hey—you found us"
  // const sentenceParts1 = sentence1.split(" ");
  // const fadeInStartIndex1 = 0;

  // const sentence2 = "That probably means you’ve got good taste"
  // const sentenceParts2 = sentence2.split(" ");
  // const fadeInStartIndex2 = 3;

  // const sentence3 = "Here’s something I think you’ll like..."
  // const sentenceParts3 = sentence3.split(" ");
  // const fadeInStartIndex3 = 0;

  // const sentence4 = "The way that you satisfy hidden cravings is about to change —forever"
  // const sentenceParts4 = sentence4.split(" ");
  // const fadeInStartIndex4 = 5;
  // const fadeInStartIndex4_1 = 7;
  // const fadeInStartIndex4_2 = 11;

  // const sentence5 = "You belong here now"
  // const sentenceParts5 = sentence5.split(" ");
  // const fadeInStartIndex5 = 0;

  // const sentence6 = "Can’t wait to see you again n’ Again"
  // const sentenceParts6 = sentence6.split(" ");
  // const fadeInStartIndex6_1 = 0;
  // const fadeInStartIndex6_2 = 7;

  return (
    // <>
    //   <div
      //   style={{
      //     background: "#fff",
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     flexDirection: "column",
      //     padding:'1rem'
      //   }}
      // >
    //     <div style={{ maxWidth: "600px", width: "100%", textAlign: "left" }}>

    //       <span>
    //         <FadeIn duration={1}>
    //           {sentenceParts1.slice(fadeInStartIndex1, sentenceParts1.length).join(" ")}
    //         </FadeIn></span>
    //     </div>
    //   </div>
    //   <div style={{
    //     background: "#fff",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //      padding:'1rem'
    //   }}>
    //     <div style={{ maxWidth: "600px", width: "100%", textAlign: "left" }}>
    //       <span>
    //         <FadeIn duration={4}>
    //           {sentenceParts2.slice(0, fadeInStartIndex2).join(" ")}
    //         </FadeIn>
    //       </span>{" "}
    //       <span>
    //         <FadeIn duration={8}>
    //           {sentenceParts2.slice(fadeInStartIndex2, sentenceParts2.length).join(" ")}
    //         </FadeIn>
    //       </span>
    //     </div>
    //   </div>

    //   <div style={{
    //     background: "#fff",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //      padding:'1rem'
    //   }}>
    //     <div style={{ maxWidth: "600px", width: "100%", textAlign: "left" }}>
    //       <span>
    //         <FadeIn duration={6}>
    //           {sentenceParts3.slice(fadeInStartIndex3, sentenceParts3.length).join(" ")}
    //         </FadeIn>
    //       </span>
    //     </div>
    //   </div>

    //   <div style={{
    //     background: "#fff",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //      padding:'1rem'
    //   }}>
    //     <div style={{ maxWidth: "600px", width: "100%", textAlign: "left" }}>
    //       <span>
    //         <FadeIn duration={16}>
    //           {sentenceParts4.slice(0, fadeInStartIndex4).join(" ")}
    //         </FadeIn>
    //       </span>
    //       <span>
    //         <FadeIn duration={20}>
    //           {sentenceParts4.slice(fadeInStartIndex4, fadeInStartIndex4_1).join(" ")}
    //         </FadeIn>
    //       </span>
    //       <span>
    //         <FadeIn duration={24}>
    //           {sentenceParts4.slice(fadeInStartIndex4_1, fadeInStartIndex4_2).join(" ")}
    //         </FadeIn>
    //       </span>
    //       <span>
    //         <FadeIn duration={28}>
    //           {sentenceParts4.slice(fadeInStartIndex4_2, sentenceParts4.length).join(" ")}
    //         </FadeIn>
    //       </span>
    //     </div>
    //   </div>

    //   <div style={{
    //     background: "#fff",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //      padding:'1rem'
    //   }}>
    //     <div style={{ maxWidth: "600px", width: "100%", textAlign: "left" }}>
    //       <span>
    //         <FadeIn duration={32}>
    //           {sentenceParts5.slice(fadeInStartIndex5, sentenceParts5.length).join(" ")}
    //         </FadeIn>
    //       </span>
    //     </div>
    //   </div>

    //   <div style={{
    //     background: "#fff",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     flexDirection: "column",
    //      padding:'1rem'
    //   }}>
    //     <div style={{ maxWidth: "600px", width: "100%", textAlign: "left" }}>
    //       <span>
    //         <FadeIn duration={36}>
    //           {sentenceParts6.slice(fadeInStartIndex6_1, fadeInStartIndex6_2).join(" ")}
    //         </FadeIn>
    //       </span>{" "}
    //       <span>
    //         <FadeIn duration={40}>
    //           {sentenceParts6.slice(fadeInStartIndex6_2, sentenceParts6.length).join(" ")}
    //         </FadeIn>
    //       </span>
    //     </div>
    //   </div>

    // </>


    <>
      <div>
        <FadeInLine text="Oh hey—you found us" delay={200} />
      </div>

      <div>
        <span><FadeInLine text="That probably means" delay={1200} /></span>{" "}
        <span><FadeInLine text="you’ve got good taste" delay={1700} /></span>
      </div>
      <div>
        <FadeInLine text="Here’s something I think you’ll like..." delay={2700} />
      </div>
      <div>
        <span><FadeInLine text="The way that you satisfy" delay={3700} /></span>{" "}

        <span><FadeInLine text="hidden cravings" delay={4200} /></span>{" "}
        <span><FadeInLine text="is about to change" delay={4700} /></span>{" "}
        <span><FadeInLine text="—forever" delay={5700} /></span>{" "}
      </div>
      <div>
        <span><FadeInLine text="You belong here now" delay={6700} /></span>{" "}
      </div>
      <div>
        <span><FadeInLine text="Can’t wait to see you again" delay={8700} /></span>{" "}
        <span><FadeInLine text="n’ Again" delay={9700} /></span>
      </div>
    </>
  );
}

const FadeInLine = ({ text, delay }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span className={isVisible ? 'fade-in' : 'fade-in-delay'} style={{ opacity: isVisible ? 1 : 0}}>
      {text}
    </span>
  );
};

export default Text