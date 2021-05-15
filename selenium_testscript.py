import getpass
import io
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time
# from tqdm import tqdm
from webdriver_manager.chrome import ChromeDriverManager


def sidebarButtons(driver):
    try:
        dashboard_btn = driver.find_element_by_link_text("Dashboard")
        dashboard_btn.click()
        time.sleep(3)

        # click Locations button 
        location_btn = driver.find_element_by_link_text("Locations")
        location_btn.click()
        time.sleep(3)
    except NoSuchElementException as elementexception:
        print("Element in Sidebar not found")
        raise elementexception


def locationsTesting(driver):
    try:
        # find textfield and enter keys
        location_textfield = driver.find_element_by_id("name")
        location_textfield.clear()
        location_textfield.send_keys("Location 123")
        time.sleep(3)

        # add location
        add_location_btn = driver.find_element_by_xpath("//button[contains(text(),'Add')]")
        add_location_btn.click()
        time.sleep(3)

        # location edit button
        edit_location_btn = driver.find_element_by_xpath("//button[@class='btn btn-primary mr-1 float-right'][1]")
        edit_location_btn.click()
        time.sleep(3)

        # edit selected location
        location_edit_textfield = driver.find_element_by_xpath("//input[@id='name'][1]")
        location_edit_textfield.clear()
        location_edit_textfield.send_keys("edited_location")
        time.sleep(2)

        tablesTesting(driver)

        save_location_btn = driver.find_element_by_xpath("//button[contains(text(),'Save')]")
        save_location_btn.click()
        time.sleep(2)
    except NoSuchElementException as elementexception:
        print("Element in Locations not found")
        raise elementexception


def tablesTesting(driver):
    try:
        # insert table name
        table_textfield = driver.find_element_by_xpath("//input[@placeholder='Table Name']")
        table_textfield.clear()
        table_textfield.send_keys("Table 123")
        time.sleep(3)

        # add new table
        add_table_btn = driver.find_element_by_xpath("//button[contains(text(),'Add')]")
        add_table_btn.click()
        time.sleep(2)

        # edit table button
        edit_table_btn = driver.find_element_by_xpath("//button[contains(text(),'Edit')]")
        edit_table_btn.click()
        time.sleep(3)

        # edit table
        table_edit_textfield = driver.find_element_by_id("name")
        table_edit_textfield.clear()
        table_edit_textfield.send_keys("edited_table")
        time.sleep(3)

        # save edited table
        save_table_btn = driver.find_element_by_xpath("//button[contains(text(),'Save')]")
        save_table_btn.click()
        time.sleep(2)
    except NoSuchElementException as elementexception:
        print("Element in Tables not found")
        raise elementexception


def login(driver):
    try:
        time.sleep(1)
        log_in_btn = driver.find_element_by_link_text("Log in")
        log_in_btn.click()
        time.sleep(2)
        user_txt = driver.find_element_by_id("Input_Email")
        user_txt.clear()
        user_txt.send_keys("admin@selenium.at")
        time.sleep(1)
        pw_txt = driver.find_element_by_id("Input_Password")
        pw_txt.clear()
        pw_txt.send_keys("Testrun1!")
        time.sleep(1)
        btn_login_submit = driver.find_element_by_id("login-submit")
        btn_login_submit.click()
        time.sleep(2)
    except NoSuchElementException as elementexception:
        print("Element in Login not found")
        raise elementexception


def main():
    base_url = "https://localhost:5001/"
    driver = webdriver.Chrome(ChromeDriverManager().install())
    driver.get(base_url)
    login(driver)
    sidebarButtons(driver)
    locationsTesting(driver)


if __name__ == "__main__":
    main()
