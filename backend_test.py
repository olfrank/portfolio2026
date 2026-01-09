#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form
Tests the contact form submission and retrieval endpoints
"""

import requests
import json
import sys
from datetime import datetime
import os
from pathlib import Path

# Load the backend URL from frontend .env file
def load_backend_url():
    frontend_env_path = Path("/app/frontend/.env")
    if not frontend_env_path.exists():
        print("❌ Frontend .env file not found")
        return None
    
    with open(frontend_env_path, 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.split('=', 1)[1].strip()
    
    print("❌ REACT_APP_BACKEND_URL not found in frontend .env")
    return None

def test_contact_form_api():
    """Test all contact form API endpoints"""
    
    # Get backend URL
    backend_url = load_backend_url()
    if not backend_url:
        return False
    
    api_base = f"{backend_url}/api"
    print(f"🔗 Testing API at: {api_base}")
    
    # Test results
    test_results = {
        "valid_submission": False,
        "invalid_email": False,
        "short_message": False,
        "retrieve_submissions": False,
        "database_storage": False
    }
    
    # Store submission ID for verification
    submission_id = None
    
    print("\n" + "="*60)
    print("TESTING CONTACT FORM API")
    print("="*60)
    
    # Test 1: Valid Contact Form Submission
    print("\n📝 Test 1: Valid Contact Form Submission")
    try:
        valid_data = {
            "email": "john.doe@example.com",
            "message": "This is a test message from the portfolio contact form. I'm interested in discussing potential collaboration opportunities."
        }
        
        response = requests.post(f"{api_base}/contact", json=valid_data, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("success") and "message" in response_data:
                submission_id = response_data.get("id")
                test_results["valid_submission"] = True
                print("   ✅ Valid submission test PASSED")
            else:
                print("   ❌ Valid submission test FAILED - Invalid response format")
        else:
            print(f"   ❌ Valid submission test FAILED - Status code: {response.status_code}")
            
    except Exception as e:
        print(f"   ❌ Valid submission test FAILED - Exception: {str(e)}")
    
    # Test 2: Invalid Email
    print("\n📧 Test 2: Invalid Email Format")
    try:
        invalid_email_data = {
            "email": "invalid-email-format",
            "message": "Test message with invalid email format"
        }
        
        response = requests.post(f"{api_base}/contact", json=invalid_email_data, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        # Should handle gracefully (either accept or return proper error)
        if response.status_code in [200, 400, 422]:
            test_results["invalid_email"] = True
            print("   ✅ Invalid email test PASSED - Handled gracefully")
        else:
            print(f"   ❌ Invalid email test FAILED - Unexpected status: {response.status_code}")
            
    except Exception as e:
        print(f"   ❌ Invalid email test FAILED - Exception: {str(e)}")
    
    # Test 3: Short Message
    print("\n💬 Test 3: Short Message")
    try:
        short_message_data = {
            "email": "test.user@example.com",
            "message": "Hi"
        }
        
        response = requests.post(f"{api_base}/contact", json=short_message_data, timeout=10)
        print(f"   Status Code: {response.status_code}")
        print(f"   Response: {response.text}")
        
        # Should accept short messages (no frontend validation in backend)
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("success"):
                test_results["short_message"] = True
                print("   ✅ Short message test PASSED")
            else:
                print("   ❌ Short message test FAILED - Not successful")
        else:
            print(f"   ❌ Short message test FAILED - Status code: {response.status_code}")
            
    except Exception as e:
        print(f"   ❌ Short message test FAILED - Exception: {str(e)}")
    
    # Test 4: Retrieve Contact Submissions
    print("\n📋 Test 4: Retrieve Contact Submissions")
    try:
        response = requests.get(f"{api_base}/contact", timeout=10)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code == 200:
            submissions = response.json()
            print(f"   Found {len(submissions)} submissions")
            
            if isinstance(submissions, list):
                test_results["retrieve_submissions"] = True
                print("   ✅ Retrieve submissions test PASSED")
                
                # Check if submissions are sorted by date (most recent first)
                if len(submissions) > 1:
                    dates = [sub.get("submitted_at") for sub in submissions if sub.get("submitted_at")]
                    if dates == sorted(dates, reverse=True):
                        print("   ✅ Submissions properly sorted by date")
                    else:
                        print("   ⚠️  Submissions may not be sorted correctly")
                        
                # Print sample submission structure
                if submissions:
                    print("   Sample submission structure:")
                    sample = submissions[0]
                    for key in ["id", "email", "message", "submitted_at", "ip_address", "user_agent"]:
                        if key in sample:
                            value = sample[key]
                            if key == "message" and len(str(value)) > 50:
                                value = str(value)[:50] + "..."
                            print(f"     {key}: {value}")
            else:
                print("   ❌ Retrieve submissions test FAILED - Response not a list")
        else:
            print(f"   ❌ Retrieve submissions test FAILED - Status code: {response.status_code}")
            print(f"   Response: {response.text}")
            
    except Exception as e:
        print(f"   ❌ Retrieve submissions test FAILED - Exception: {str(e)}")
    
    # Test 5: Verify Database Storage
    print("\n🗄️  Test 5: Verify Database Storage")
    if submission_id and test_results["retrieve_submissions"]:
        try:
            response = requests.get(f"{api_base}/contact", timeout=10)
            if response.status_code == 200:
                submissions = response.json()
                found_submission = None
                
                for submission in submissions:
                    if submission.get("id") == submission_id:
                        found_submission = submission
                        break
                
                if found_submission:
                    test_results["database_storage"] = True
                    print("   ✅ Database storage test PASSED - Submission found in database")
                    print(f"     Stored submission ID: {submission_id}")
                    print(f"     Email: {found_submission.get('email')}")
                    print(f"     Message length: {len(found_submission.get('message', ''))}")
                else:
                    print(f"   ❌ Database storage test FAILED - Submission {submission_id} not found")
            else:
                print("   ❌ Database storage test FAILED - Could not retrieve submissions")
                
        except Exception as e:
            print(f"   ❌ Database storage test FAILED - Exception: {str(e)}")
    else:
        print("   ⚠️  Database storage test SKIPPED - No valid submission ID or retrieve failed")
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    passed_tests = sum(test_results.values())
    total_tests = len(test_results)
    
    for test_name, passed in test_results.items():
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All contact form API tests PASSED!")
        return True
    else:
        print("⚠️  Some contact form API tests FAILED!")
        return False

def check_backend_service():
    """Check if backend service is running"""
    backend_url = load_backend_url()
    if not backend_url:
        return False
    
    try:
        response = requests.get(f"{backend_url}/api/", timeout=5)
        if response.status_code == 200:
            print(f"✅ Backend service is running at {backend_url}")
            return True
        else:
            print(f"❌ Backend service returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Backend service is not accessible: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Starting Contact Form API Tests")
    print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Check backend service first
    if not check_backend_service():
        print("\n❌ Backend service check failed. Cannot proceed with tests.")
        sys.exit(1)
    
    # Run contact form tests
    success = test_contact_form_api()
    
    print(f"\n⏰ Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    if success:
        print("🎯 All tests completed successfully!")
        sys.exit(0)
    else:
        print("💥 Some tests failed!")
        sys.exit(1)