import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { User, Users, Building, Upload, Phone, Mail, FileText, Trophy, Heart, Network, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import tournamentLogo from '../assets/logo400.png';
import upiQR from '../assets/upi_qr.jpg';
import { API_ENDPOINTS } from '../config/api';


const RegistrationPage = () => {
  const [playerForm, setPlayerForm] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    playingPosition: ''
  });

  const [teamForm, setTeamForm] = useState({
    teamName: '',
    captainName: '',
    captainContact: '',
    captainEmail: '',
    teamMembers: ''
  });

  const [sponsorForm, setSponsorForm] = useState({
    contactNumber: '',
    email: '',
    companyName: '',
    sponsorshipLevel: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [activeTab, setActiveTab] = useState('player');
  useEffect(() => {
    if (window.tournamentRulesScroll === true) {
      setTimeout(() => {
        const el = document.getElementById("tournament-rules");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        window.tournamentRulesScroll = false;
      }, 100);
    }
  }, []);
  
  const playingPositions = [
    'Goalkeeper (GK)',
    'Defender (CB/LB/RB)',
    'Midfielder (CM/CDM/CAM)',
    'Winger (LW/RW)',
    'Forward (ST/CF)'
  ];

  const sponsorshipLevels = [
    'Gold',
    'Silver',
    'Bronze',
    'Title Sponsor'
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handlePlayerSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    
    // Client-side validation
    if (!playerForm.fullName.trim()) {
      setSubmissionError('Full name is required');
      return;
    }
    
    if (!validateEmail(playerForm.email)) {
      setSubmissionError('Please enter a valid email address');
      return;
    }
    
    if (!validatePhone(playerForm.contactNumber)) {
      setSubmissionError('Please enter a valid contact number');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER_PLAYER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerForm)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Clear form
        setPlayerForm({
          fullName: '',
          contactNumber: '',
          email: '',
          playingPosition: ''
        });
      } else {
        setSubmissionError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmissionError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    
    // Client-side validation
    if (!teamForm.teamName.trim()) {
      setSubmissionError('Team name is required');
      return;
    }
    
    if (!teamForm.captainName.trim()) {
      setSubmissionError('Captain name is required');
      return;
    }
    
    if (!validateEmail(teamForm.captainEmail)) {
      setSubmissionError('Please enter a valid captain email address');
      return;
    }
    
    if (!validatePhone(teamForm.captainContact)) {
      setSubmissionError('Please enter a valid captain contact number');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER_TEAM, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamForm)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Clear form
        setTeamForm({
          teamName: '',
          captainName: '',
          captainContact: '',
          captainEmail: '',
          teamMembers: ''
        });
      } else {
        setSubmissionError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmissionError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    
    // Client-side validation
    if (!sponsorForm.companyName.trim()) {
      setSubmissionError('Company name is required');
      return;
    }
    
    if (!validateEmail(sponsorForm.email)) {
      setSubmissionError('Please enter a valid email address');
      return;
    }
    
    if (!validatePhone(sponsorForm.contactNumber)) {
      setSubmissionError('Please enter a valid contact number');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER_SPONSOR, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorForm)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Clear form
        setSponsorForm({
          contactNumber: '',
          email: '',
          companyName: '',
          sponsorshipLevel: ''
        });
      } else {
        setSubmissionError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmissionError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Success message component
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for registering! You will receive a confirmation email shortly with payment details and further instructions.
              </p>
              <Button onClick={() => setSubmitted(false)} className="w-full">
                Register Another Entry
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <img 
            src={tournamentLogo} 
            alt="Tournament Logo" 
            className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tournament Registration</h1>
          <p className="text-sm md:text-sm opacity-90 mb-4 text-yellow-400">
            Reignite the cherished flame of Kerala's football soul<br />
            where every kick echoes the deep love we carry in our hearts,<br />
            bridging the distance and bringing home the passion we've long missed.
          </p>
        </motion.div>

        {/* Why Participate Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Join the Excitement – Register Now!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Heart className="w-12 h-12 text-red-500 mb-3" />
                  <h3 className="font-semibold mb-2">Celebrate Onam</h3>
                  <p className="text-sm text-gray-600">with the spirit of football!</p>
                </div>
                <div className="flex flex-col items-center">
                  <Network className="w-12 h-12 text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">Network</h3>
                  <p className="text-sm text-gray-600">with Malayali community in Hyderabad.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Trophy className="w-12 h-12 text-yellow-500 mb-3" />
                  <h3 className="font-semibold mb-2">Showcase Skills</h3>
                  <p className="text-sm text-gray-600">your team's skills or personal talent.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="w-12 h-12 text-green-500 mb-3" />
                  <h3 className="font-semibold mb-2">Support Youth</h3>
                  <p className="text-sm text-gray-600">sports as a valued sponsor.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Registration Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>Choose your registration type and fill out the form</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="player" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Player
                  </TabsTrigger>
                  <TabsTrigger value="team" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Team
                  </TabsTrigger>
                  <TabsTrigger value="sponsor" className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Sponsor
                  </TabsTrigger>
                </TabsList>

                {/* Error Message */}
                {submissionError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-red-700 text-sm">{submissionError}</span>
                  </motion.div>
                )}

                {/* Player Registration */}
                <TabsContent value="player">
                  <form onSubmit={handlePlayerSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="playerName">Full Name *</Label>
                        <Input
                          id="playerName"
                          value={playerForm.fullName}
                          onChange={(e) => setPlayerForm(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="playerContact">Contact Number *</Label>
                        <Input
                          id="playerContact"
                          value={playerForm.contactNumber}
                          onChange={(e) => setPlayerForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          placeholder="Enter your contact number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="playerEmail">Email Address *</Label>
                      <Input
                        id="playerEmail"
                        type="email"
                        value={playerForm.email}
                        onChange={(e) => setPlayerForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="playerPosition">Playing Position *</Label>
                      <Select value={playerForm.playingPosition} onValueChange={(value) => setPlayerForm(prev => ({ ...prev, playingPosition: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your playing position" />
                        </SelectTrigger>
                        <SelectContent>
                          {playingPositions.map(position => (
                            <SelectItem key={position} value={position}>{position}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Registering...' : 'Register as Player'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Team Registration */}
                <TabsContent value="team">
                  <form onSubmit={handleTeamSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="teamName">Team Name *</Label>
                      <Input
                        id="teamName"
                        value={teamForm.teamName}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, teamName: e.target.value }))}
                        placeholder="Enter your team name"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="captainName">Captain/Manager Name *</Label>
                        <Input
                          id="captainName"
                          value={teamForm.captainName}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, captainName: e.target.value }))}
                          placeholder="Enter captain's name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="captainContact">Captain Contact *</Label>
                        <Input
                          id="captainContact"
                          value={teamForm.captainContact}
                          onChange={(e) => setTeamForm(prev => ({ ...prev, captainContact: e.target.value }))}
                          placeholder="Enter captain's contact"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="captainEmail">Captain Email *</Label>
                      <Input
                        id="captainEmail"
                        type="email"
                        value={teamForm.captainEmail}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, captainEmail: e.target.value }))}
                        placeholder="Enter captain's email"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="teamMembers">Team Members (Optional)</Label>
                      <Textarea
                        id="teamMembers"
                        value={teamForm.teamMembers}
                        onChange={(e) => setTeamForm(prev => ({ ...prev, teamMembers: e.target.value }))}
                        placeholder="List team member names (one per line or comma-separated)"
                        rows={4}
                      />
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Registering...' : 'Register Team'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Sponsor Registration */}
                <TabsContent value="sponsor">
                  <form onSubmit={handleSponsorSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={sponsorForm.companyName}
                        onChange={(e) => setSponsorForm(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sponsorContact">Contact Number *</Label>
                        <Input
                          id="sponsorContact"
                          value={sponsorForm.contactNumber}
                          onChange={(e) => setSponsorForm(prev => ({ ...prev, contactNumber: e.target.value }))}
                          placeholder="Enter contact number"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="sponsorEmail">Email Address *</Label>
                        <Input
                          id="sponsorEmail"
                          type="email"
                          value={sponsorForm.email}
                          onChange={(e) => setSponsorForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter email address"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="sponsorshipLevel">Sponsorship Level *</Label>
                      <Select value={sponsorForm.sponsorshipLevel} onValueChange={(value) => setSponsorForm(prev => ({ ...prev, sponsorshipLevel: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sponsorship level" />
                        </SelectTrigger>
                        <SelectContent>
                          {sponsorshipLevels.map(level => (
                            <SelectItem key={level} value={level.toLowerCase()}>{level}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Registering...' : 'Register as Sponsor'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

  {/* Payment Information */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  className="mt-10"
>
  <Card className="max-w-2xl mx-auto shadow-xl !p-0">
    <CardHeader className="pb-2">
      <CardTitle className="text-2xl font-bold mb-1">Payment Information</CardTitle>
      <CardDescription>
        Please pay the registration fee after submitting your form using either method below.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col md:flex-row gap-10 items-center md:items-start px-6 pb-6">
      {/* Bank Details */}
      <div className="flex-1 w-full">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold mb-2">Bank Transfer Details</span>
        </div>
        <div className="space-y-2 text-base pl-1">
          <div>
            <span className="font-semibold text-gray-700">Account Holder:</span><br />
            REMONTADA INDIA (OPC) PRIVATE LIMITED
          </div>
          <div>
            <span className="font-semibold text-gray-700">Account Number:</span><br />
            50200091136498
          </div>
          <div>
            <span className="font-semibold text-gray-700">IFSC:</span><br />
            HDFC0000045
          </div>
        </div>
      </div>
      {/* UPI/QR Section */}
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 rounded bg-green-100 text-green-900 text-xs font-semibold mb-2">UPI / QR Payment</span>
        </div>
        <img
          src={upiQR}
          alt="Scan UPI QR"
          style={{
            width: 220,
            height: 220,
            objectFit: 'contain',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 4px 18px 0 rgba(0,0,0,0.07)',
            padding: 8,
            marginBottom: 8,
            imageRendering: 'crisp-edges', // best for high-res QR
            border: '1.5px solid #e0e7ef'
          }}
          className="qr-img"
          loading="lazy"
        />
        <div className="text-center text-base">
          <div>
            <span className="font-semibold">UPI ID:</span> 8883210696@okbizaxis
          </div>
          <div className="text-xs text-gray-500 pt-1">(Scan with any UPI app)</div>
        </div>
      </div>
    </CardContent>
    <div className="bg-blue-50 px-6 pb-6">
      <div className="text-sm mt-3 px-3 py-2 rounded-md">
        <strong>After payment</strong>, send your payment confirmation to&nbsp;
        <a
          href="mailto:info@ragefootballclub.com"
          className="text-blue-700 font-medium underline"
        >
          info@ragefootballclub.com
        </a>
        &nbsp;or WhatsApp: <strong>+91 88832 10696</strong>.
      </div>
    </div>
  </Card>
</motion.div>
{/* Tournament Rules */} 

 <div id="tournament-rules">
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  className="mt-10"
>

          <Card>
				<CardHeader>
				  <CardTitle className="text-3xl mb-4 text-center text-green-700">
	  Rage 7-a-Side Football Tournament<br />
	  <strong className="font-bold text-center">Rules and Regulations</strong>
	</CardTitle>
				</CardHeader>
				<CardContent>
  <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-lg shadow-sm">
    
    {/* Reporting and Warm-Up */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Reporting and Warm-Up
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>
          All teams must report to the ground at least <b>20 minutes prior</b> to their scheduled match time.
        </li>
        <li>
          Players should complete warm-up and be fully ready at least <b>8 minutes before</b> the start of the match.
        </li>
        <li>Proper warm-up is recommended to avoid injuries.</li>
      </ul>
    </section>

    {/* Team Composition */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Team Composition
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Each team consists of <b>7 players on the field</b> at any time, including the goalkeeper.</li>
        <li>Squad size up to <b>12 registered players</b> per tournament; only 7 on pitch at a time.</li>
        <li>
          Substitutions are <b>unlimited and rolling</b>, must be authorized by the referee before entering.
        </li>
		<li> * Each team may have upto 3 Non Malayalee players *.
		</li>
      </ul>
    </section>

    {/* Player Equipment and Uniform */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Player Equipment and Uniform
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Shin guards are <b>mandatory</b> for all players.</li>
        <li>No ornaments, jewelry, or accessories allowed.</li>
        <li>Fingernails must be <b>trimmed</b>.</li>
        <li>All players must wear same color jersey, shorts, and socks.</li>
        <li>Shorts and socks should preferably be black/white or match jersey color.</li>
        <li>Proper football boots required. Barefoot/inappropriate footwear not allowed.</li>
      </ul>
    </section>

    {/* Match Duration and Structure */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Match Duration and Structure
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>
          Matches have two halves, <b>12–15 minutes each</b>, with a 2–5 min halftime break.
        </li>
        <li>Duration may vary, will be announced prior to tournament.</li>
        </ul>
    </section>

    {/* Playing Rules */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">Playing Rules</h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>
          Played according to FIFA Laws, modified for 7-a-side.
        </li>
        <li>
          No slide tackles advised unless otherwise specified.
        </li>
        <li>Throw-ins by hand. Heading permitted.</li>
        <li>Same as Kerala 7's rule.</li>
      </ul>
    </section>

    {/* Discipline and Conduct */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Discipline and Conduct
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>No dissent or arguments with referee. Referee’s decision is final.</li>
        <li>No misconduct toward opponents: no foul language, altercations or unsporting behavior.</li>
        <li>
          Yellow &amp; Red cards: 2 yellow cards = red &amp; suspension; straight red = ejection and at least one-match suspension.
        </li>
        <li>
          Offensive behavior by players or spectators can lead to removal or disqualification.
        </li>
      </ul>
    </section>

    {/* Match Start Protocol */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Match Start Protocol
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Teams must be ready at kick-off time.</li>
        <li>Up to 5 min late: start with 2-goal deficit. More than 5 min late: match forfeited 0–3.</li>
      </ul>
    </section>

    {/* Safety and Fair Play */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Safety and Fair Play
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Shin guards mandatory. No metal studs on boots.</li>
        <li>Injured players should leave the field promptly to avoid delay.</li>
        <li>Unfair or dangerous play will be penalized.</li>
      </ul>
    </section>

    {/* General Guidelines */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        General Guidelines
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Teams should bring a ball as prescribed.</li>
        <li>Ensure field &amp; goal sizes match tournament standards.</li>
        <li>At least 4 players needed to start a match.</li>
        <li>Hydrate and rest between games.</li>
      </ul>
    </section>

    {/* Additional Provisions */}
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-green-600">
        Additional Provisions
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>
          If a knockout match is tied, <b>extra time or penalties</b> to decide winner.
        </li>
        <li>
          Organizers reserve the right to amend rules or discipline as needed.
        </li>
      </ul>
    </section>
  </div>
     </CardContent>
          </Card>
        </motion.div>
		</div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>info@ragefootballclub.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>+91 88832 10696</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationPage;
