const assert = require('assert');

function validateCourse(course) {
  return (
    course !== null &&
    typeof course === 'object' &&
    typeof course.id === 'string' &&
    typeof course.title === 'string' &&
    typeof course.progress === 'number' &&
    course.progress >= 0 &&
    course.progress <= 100 &&
    typeof course.icon_name === 'string' &&
    typeof course.created_at === 'string' &&
    !isNaN(Date.parse(course.created_at))
  );
}

console.log('Running schema validation tests...');

// Test 1: Valid course
const validCourse = {
  id: 'c-1',
  title: 'Valid Course',
  progress: 85,
  icon_name: 'Code',
  created_at: '2023-10-01T12:00:00Z'
};
assert.strictEqual(validateCourse(validCourse), true, 'Valid course should pass validation');

// Test 2: Progress out of range
const invalidProgress = { ...validCourse, progress: 150 };
assert.strictEqual(validateCourse(invalidProgress), false, 'Course with progress > 100 should fail');

// Test 3: Negative progress
const negativeProgress = { ...validCourse, progress: -5 };
assert.strictEqual(validateCourse(negativeProgress), false, 'Course with progress < 0 should fail');

// Test 4: Invalid date format
const invalidDate = { ...validCourse, created_at: 'not-a-date' };
assert.strictEqual(validateCourse(invalidDate), false, 'Course with invalid created_at date should fail');

// Test 5: Missing fields
const missingFields = { id: 'c-2', title: 'Half Course' };
assert.strictEqual(validateCourse(missingFields), false, 'Course with missing fields should fail');

console.log('All schema validation tests passed successfully!');
