// import React, { useState } from "react";

const RandomTeamSelector = () => {
  const [playerNames, setPlayerNames] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamSize, setTeamSize] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddPlayers = () => {
    const newPlayers = playerNames
      .split("\n")
      .map((name) => name.trim())
      .filter((name) => name);

    if (newPlayers.length === 0) {
      setErrorMessage("Please enter valid player names.");
      return;
    }

    const allExistingPlayers = teams.flat();
    const duplicates = newPlayers.filter((player) =>
      allExistingPlayers.includes(player)
    );

    if (duplicates.length > 0) {
      setErrorMessage(
        `The following names already exist: ${duplicates.join(", ")}`
      );
      return;
    }

    const updatedTeams = [...teams];
    let remainingPlayers = [...newPlayers];

    // Distribute new players across existing teams
    for (let i = 0; i < updatedTeams.length && remainingPlayers.length > 0; i++) {
      while (updatedTeams[i].length < teamSize && remainingPlayers.length > 0) {
        updatedTeams[i].push(remainingPlayers.shift());
      }
    }

    // Create new teams if there are still remaining players
    while (remainingPlayers.length > 0) {
      const newTeam = remainingPlayers.splice(0, teamSize);
      updatedTeams.push(newTeam);
    }

    setTeams(updatedTeams);
    setPlayerNames(""); // Clear input after adding players
    setErrorMessage(""); // Clear error message
  };

  const playerCount = playerNames
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Incremental Team Selector
      </h1>

      {/* Player Input */}
      <div className="mb-6 w-full max-w-lg">
        <label htmlFor="playerNames" className="text-gray-700">
          Enter Player Names (one per line):
        </label>
        <textarea
          id="playerNames"
          rows="10"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter player names, one per line"
          value={playerNames}
          onChange={(e) => setPlayerNames(e.target.value)}
        ></textarea>
        <p className="text-gray-600 mt-2">
          <strong>Player Count:</strong> {playerCount}
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>

      {/* Team Size Input */}
      <div className="mb-6">
        <label htmlFor="teamSize" className="text-gray-700">
          Team Size:
        </label>
        <input
          type="number"
          id="teamSize"
          className="p-2 border border-gray-300 rounded-md ml-2 w-20"
          value={teamSize}
          onChange={(e) => setTeamSize(Number(e.target.value))}
        />
      </div>

      {/* Add Players Button */}
      <button
        onClick={handleAddPlayers}
        className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-all"
      >
        Add Players
      </button>

      {/* Teams Display */}
      {teams.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-6">
          {teams.map((team, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-lg flex flex-col items-center"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Team {index + 1}
              </h2>
              <ul className="w-full text-left">
                {team.map((player, i) => (
                  <li
                    key={i}
                    className="py-1 px-2 border-b last:border-none border-gray-200"
                  >
                    {player}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RandomTeamSelector;
