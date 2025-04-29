import XCTest
import SwiftTreeSitter
import TreeSitterBanh

final class TreeSitterBanhTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_banh())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Bánh grammar")
    }
}
