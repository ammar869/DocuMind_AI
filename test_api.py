#!/usr/bin/env python3
import requests
import sys

def test_health_endpoint():
    """Test the health endpoint"""
    try:
        response = requests.get("http://127.0.0.1:8000/api/health")
        print(f"Health endpoint status: {response.status_code}")
        print(f"Health endpoint response: {response.json()}")
        return response.status_code == 200 and response.json().get("status") == "ok"
    except Exception as e:
        print(f"Error testing health endpoint: {e}")
        return False

def test_upload_endpoint():
    """Test the upload endpoint with a PDF file"""
    try:
        # Create a dummy PDF file for testing
        pdf_content = b"%PDF-1.4\ntest pdf content"
        
        files = {"file": ("test.pdf", pdf_content, "application/pdf")}
        
        response = requests.post("http://127.0.0.1:8000/api/documents/upload", files=files)
        
        print(f"Upload endpoint status: {response.status_code}")
        print(f"Upload endpoint response: {response.json()}")
        
        return response.status_code == 200
    except Exception as e:
        print(f"Error testing upload endpoint: {e}")
        return False

if __name__ == "__main__":
    print("Testing DocuMind API endpoints...\n")
    
    print("=== Testing Health Endpoint ===")
    health_ok = test_health_endpoint()
    
    print("\n=== Testing Upload Endpoint ===")
    upload_ok = test_upload_endpoint()
    
    print(f"\n=== Test Results ===")
    print(f"Health endpoint: {'PASS' if health_ok else 'FAIL'}")
    print(f"Upload endpoint: {'PASS' if upload_ok else 'FAIL'}")
    
    if health_ok and upload_ok:
        print("\nAll tests passed!")
        sys.exit(0)
    else:
        print("\nSome tests failed.")
        sys.exit(1)