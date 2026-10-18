const test = require("node:test");
const assert = require("node:assert");
const artifactService = require("../src/services/artifactService");

test("lấy tất cả hiện vật trả về mảng không rỗng", () => {
  const result = artifactService.getAllArtifacts();
  assert.ok(Array.isArray(result));
  assert.ok(result.length > 0);
});

test("lấy hiện vật theo id hợp lệ", () => {
  const result = artifactService.getArtifactById(1);
  assert.strictEqual(result.id, 1);
});

test("id không tồn tại thì ném lỗi 404", () => {
  assert.throws(() => artifactService.getArtifactById(999), (err) => err.status === 404);
});
