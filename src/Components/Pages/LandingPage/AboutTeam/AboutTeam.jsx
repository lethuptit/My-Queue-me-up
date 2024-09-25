import React from 'react';
import styled from 'styled-components';
const LinkedInIcon = '/images/linkedin.png'; 
const GitHubIcon = '/images/github.png'; 
const TinaPhoto = '/images/TinaPhoto.png';
const ThulePhoto = '/images/ThulePhoto.png';
const MonikaPhoto = '/images/MonikaPhoto.jpeg';
const LinPhoto = '/images/LinPhoto.png';


const Team = () => {
  return (
    <TeamSection id="about-team">
      <TeamTitle>Our Team</TeamTitle>
      <div> 
        <p>Meet our dynamic team of four talented women, each bringing unique skills and creativity to the table.<br></br>
         Together, we turn ideas into reality and challenges into opportunities.
         Our collaboration and passion drive us to achieve excellence in every project</p>
      </div>   
      <TeamGrid>
        <TeamMember>
          <MemberImage src={TinaPhoto} alt="Tina's profile photo" />
          <MemberName>Tina</MemberName>
          <MemberRole>Web Developer</MemberRole>
          <SocialLinks>
            <a href="https://www.linkedin.com/in/tina-tang-694862230/" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={LinkedInIcon} alt="LinkedIn" />
            </a>
            <a href="https://github.com/TinaTang298" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={GitHubIcon} alt="GitHub" />
            </a>
          </SocialLinks>
        </TeamMember>
        <TeamMember>
          <MemberImage src={ThulePhoto} alt="ThuLe's profile photo" />
          <MemberName>Thu Le</MemberName>
          <MemberRole>Fullstack Developer</MemberRole>
          <SocialLinks>
            <a href="https://www.linkedin.com/in/thu-le-007739181/" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={LinkedInIcon} alt="LinkedIn" />
            </a>
            <a href="https://github.com/lethuptit" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={GitHubIcon} alt="GitHub" />
            </a>
          </SocialLinks>
        </TeamMember>
        <TeamMember>
          <MemberImage src={MonikaPhoto} alt="Monika's profile photo" />
          <MemberName>Monika</MemberName>
          <MemberRole>Web Developer</MemberRole>
          <SocialLinks>
            <a href="https://www.linkedin.com/in/monikacha/" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={LinkedInIcon} alt="LinkedIn" />
            </a>
            <a href="https://github.com/MSchaudha" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={GitHubIcon} alt="GitHub" />
            </a>
          </SocialLinks>
        </TeamMember>
        <TeamMember>
          <MemberImage src={LinPhoto} alt="Lin's profile photo" />
          <MemberName>Lin Lin</MemberName>
          <MemberRole>Web Developer</MemberRole>
          <SocialLinks>
            <a href="https://www.linkedin.com/in/linda-lin-90675b303" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={LinkedInIcon} alt="LinkedIn" />
            </a>
            <a href="https://github.com/linlinsuperjunior" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={GitHubIcon} alt="GitHub" />
            </a>
          </SocialLinks>
        </TeamMember>
      </TeamGrid>
    </TeamSection>
  );
};

const TeamSection = styled.section`
  padding: 80px 0 50px;
  background-color: #f9f9f9;
  text-align: center;
  div {
    color: #716cb2; 
  }
`;

const TeamTitle = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #716cb2;
`;

const TeamGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const TeamMember = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 250px;
  text-align: center;
`;

const MemberImage = styled.img`
  border-radius: 5%;
  width: 110px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 15px;
`;

const MemberName = styled.h3`
  font-size: 1.5em;
  margin-bottom: 5px;
`;

const MemberRole = styled.p`
  font-size: 1em;
  color: #777;
  margin-bottom: 15px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SocialIcon = styled.img`
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;


export default Team;
