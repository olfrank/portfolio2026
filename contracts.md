# API Contracts & Integration Plan

## Backend Implementation

### 1. Contact Form Submission API

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "message": "string (required, min 10 chars)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for reaching out! I'll get back to you soon.",
  "id": "contact_submission_id"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Error message"
}
```

### 2. Database Schema

**Collection:** `contact_submissions`

**Document Structure:**
```json
{
  "_id": "auto_generated",
  "email": "string",
  "message": "string",
  "submitted_at": "datetime",
  "ip_address": "string (optional)",
  "user_agent": "string (optional)"
}
```

### 3. Mock Data to Remove

From `/app/frontend/src/data/mock.js`:
- Contact form submission is currently mocked with toast notification
- Need to replace mock submission with actual API call

### 4. Frontend Integration Changes

**File:** `/app/frontend/src/components/Contact.jsx`
- Remove mock toast on form submit
- Add axios POST request to `/api/contact`
- Handle loading state during submission
- Show success/error messages using toast
- Clear form after successful submission
- Add form validation

### 5. Design Refinements

**Colors:**
- Enhance gradient visibility in hero section
- Improve glassmorphism effects with more pronounced blur
- Better color contrast for dark mode

**Spacing:**
- Increase section padding for more breathing room
- Adjust card spacing and internal padding
- Improve mobile responsiveness

**Layout:**
- Add more visual interest to About section
- Enhance project cards with subtle animations on scroll
- Add floating elements for depth

**Animations:**
- Add stagger animations to all sections
- Implement smooth page transitions
- Add micro-interactions to buttons and links
- Parallax effects on scroll
- Floating/breathing animations for hero elements

## Implementation Steps

1. ✅ Create backend model and API endpoint
2. ✅ Update frontend Contact component to use API
3. ✅ Enhance CSS with better colors and spacing
4. ✅ Add advanced animations throughout
5. ✅ Test backend with curl/testing agent
6. ✅ Test frontend functionality
