## CAMPUS CIRCULAR - From Ownership to Access
"Why buy what someone nearby already has?"
## Problem Statement
College students often need resources such as calculators, cameras, laptops, textbooks, sports equipment, tools, musical instruments or event materials for a limited period. At the same time, many such resources remain unused by their owners.
CAMPUS CIRCULAR is a proposed digital platform for a college community that enables students to discover, share, lend, borrow, donate and request resources within the campus.
The challenge is to design a trusted and user-friendly frontend experience that addresses not only resource discovery, but the complete journey from finding a resource to borrowing, returning and settling the exchange.
For example, a student may enter:
"I need to make a reel for my club event tomorrow."
The system may identify and recommend:
Camera + Tripod + Microphone + Lighting
The platform should help the user select the most suitable resources while considering availability, distance, condition, trust, charges and deposit.
## Technical Scope

* This is a frontend-only competition. No backend or database is required.
* Teams may create their own mock data using JSON files, JavaScript objects or localStorage. Borrowing, payments, approvals, returns, settlements and disputes may be simulated within the frontend.
* Teams are free to choose their technology, UI/UX, number of screens, navigation and implementation approach, provided the core problem and required functionalities are addressed.
* The objective is to design a trusted digital campus ecosystem that makes sharing practical, safe and convenient—from discovering a resource to returning it responsibly and settling the exchange.

------------------------------
## Key Functionalities## 1. User & Trust Profile
Provide campus-member profiles showing relevant information such as department/year, verification status, trust score, ratings, successful exchanges, late returns and disputes.
## 2. Resource Listing & Item Preview
Users should be able to view and/or list resources with details such as images, description, category, condition, availability, location, owner, included accessories, borrowing conditions, charges, deposit and previous usage/history.
## 3. Resource Discovery
Enable users to search, filter, sort and discover resources based on category, availability, distance, condition, rating and other relevant criteria.
## 4. Need-Based / AI-Assisted Discovery
Allow users to describe their requirement in natural language rather than only searching by item name. The system should identify possible resources and recommend suitable options.
## 5. Smart Matching & Alternatives
Rank or compare available resources using factors such as suitability, distance, availability, trust, condition, charges and deposit. If the requested resource is unavailable, suggest alternatives or allow the user to post a community request.
## 6. Borrowing Charges & Security Deposit
Support different borrowing models including hourly/daily charges, minimum charges, refundable security deposits, late fees and damage deductions. Clearly distinguish between the borrowing fee and refundable deposit.
## 7. Borrowing Agreement
Before confirming a request, display a summary of the resource, owner, borrower, duration, charges, deposit, return deadline, condition and responsibilities. The user should confirm the agreement.
## 8. Before & After Condition Tracking
Record the condition of the resource before borrowing and after return using images, checklists, ratings or other suitable interfaces. Users should be able to compare both conditions.
## 9. Borrowing Lifecycle
Simulate and visually track:
Available → Requested → Accepted → Handover → Borrowed → Return Due → Returned → Inspection → Settlement → Rated
## 10. Late Return, Damage & Settlement
Calculate applicable late fees and reflect them in the final settlement. If damage or loss is reported, allow users to submit evidence, raise a dispute and view its status/resolution.
## 11. Admin Panel
Provide a separate Admin Login and Dashboard for managing the platform. The admin interface may include:

* User and resource management
* Resource approval/rejection
* Exchange monitoring
* Overdue returns
* Reported damage/disputes
* User/resource flagging or suspension
* Platform statistics
* Fee and transaction monitoring

## 12. Platform Fee
Include a configurable platform/service fee in applicable exchanges. Clearly show:
$$\text{Borrowing Charge} + \text{Platform Fee} + \text{Security Deposit} = \text{Transaction Amount}$$ 
The platform fee should be reflected in the simulated transaction and admin dashboard.
## 13. Campus Impact Dashboard
Show meaningful community insights such as active members, resources shared, successful exchanges, popular categories, on-time returns, money saved and resources reused.
------------------------------
## AI Usage
AI tools are allowed and encouraged. Teams may use AI meaningfully for:

* Natural-language requirement understanding
* Resource recommendations
* Smart matching
* Alternative suggestions
* Condition comparison
* Trust analysis
* Personalized recommendations
* Generating borrowing requests
* Other innovative features