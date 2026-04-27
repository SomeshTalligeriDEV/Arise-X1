# API Reference

ARISE-X1 v0.1 is a frontend-only demo. The following documents the planned
API surface for v0.3+ when the backend is connected.

## ARIA Recommendation Endpoint

```
POST /api/recommend
Content-Type: application/json

{
  "userId": "string",
  "mood": "energized | stressed | tired | happy | neutral",
  "timeOfDay": "morning | afternoon | evening | night",
  "hoursSinceLastMeal": 4,
  "healthGoal": "weight_loss | muscle_gain | energy | gut_health | balanced",
  "dietaryPreference": "vegetarian | vegan | non_vegetarian | jain | keto"
}
```

**Response:**
```json
{
  "meals": [Meal],
  "ariaMessage": "string",
  "xpBonus": 50
}
```

## Voice Transcription Endpoint

```
POST /api/voice/transcribe
Content-Type: multipart/form-data

audio: <blob>
language: "en | hi | ta | kn | te"
```

**Response:**
```json
{
  "transcript": "string",
  "confidence": 0.95,
  "detectedLanguage": "hi"
}
```
