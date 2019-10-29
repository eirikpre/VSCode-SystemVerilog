// Generated from c:\Users\Vincent\Programming\VSCodeSVExtension\src\compiling\ANTLR\grammar\LexRules.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class LexRulesLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		MACROMODULE=1, MODULE=2, EXP=3, DECIMAL_BASE=4, BINARY_BASE=5, OCTAL_BASE=6, 
		HEX_BASE=7, APOSTROPHE_ZERO=8, APOSTROPHE_ONE=9, APOSTROPHE_Z_OR_X=10, 
		ZERO=11, ONE=12, TWO=13, OCTAL_DIGIT=14, DECIMAL_DIGIT=15, APOSTROPHE=16, 
		B=17, F=18, R=19, P=20, N=21, LOWER_S=22, LOWER_MS=23, LOWER_US=24, LOWER_NS=25, 
		LOWER_PS=26, LOWER_FS=27, HEX_DIGIT=28, X_DIGIT=29, Z_DIGIT=30, UNDERSCORE=31, 
		QUESTION=32, C_IDENTIFIER=33, SIMPLE_IDENTIFIER=34, SYSTEM_TF_IDENTIFIER=35, 
		ESCAPED_IDENTIFIER=36, SPACE=37, TAB=38, NEWLINE=39, ANY_ASCII_CHARACTER=40, 
		ONE_LINE_COMMENT=41, BLOCK_COMMENT=42, FILENAME=43;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] ruleNames = {
		"MACROMODULE", "MODULE", "EXP", "APOSTROPHE_FRAG", "S_FRAG", "D_FRAG", 
		"B_FRAG", "O_FRAG", "H_FRAG", "Z_FRAG", "X_FRAG", "ZERO_FRAG", "ONE_FRAG", 
		"DECIMAL_BASE", "BINARY_BASE", "OCTAL_BASE", "HEX_BASE", "APOSTROPHE_ZERO", 
		"APOSTROPHE_ONE", "APOSTROPHE_Z_OR_X", "ZERO", "ONE", "TWO", "OCTAL_DIGIT", 
		"DECIMAL_DIGIT", "APOSTROPHE", "B", "F", "R", "P", "N", "LOWER_S", "LOWER_MS", 
		"LOWER_US", "LOWER_NS", "LOWER_PS", "LOWER_FS", "HEX_DIGIT", "X_DIGIT", 
		"Z_DIGIT", "UNDERSCORE", "QUESTION", "C_IDENTIFIER", "SIMPLE_IDENTIFIER", 
		"SYSTEM_TF_IDENTIFIER", "ESCAPED_IDENTIFIER", "SPACE", "TAB", "NEWLINE", 
		"ANY_PRINTABLE_ASCII_CHARACTER_EXCEPT_WHITE_SPACE", "ANY_ASCII_CHARACTER", 
		"ONE_LINE_COMMENT", "BLOCK_COMMENT", "FILENAME"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'macromodule'", "'module'", null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, null, null, null, null, null, null, null, null, 
		null, null, null, null, "' '", "'\t'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "MACROMODULE", "MODULE", "EXP", "DECIMAL_BASE", "BINARY_BASE", "OCTAL_BASE", 
		"HEX_BASE", "APOSTROPHE_ZERO", "APOSTROPHE_ONE", "APOSTROPHE_Z_OR_X", 
		"ZERO", "ONE", "TWO", "OCTAL_DIGIT", "DECIMAL_DIGIT", "APOSTROPHE", "B", 
		"F", "R", "P", "N", "LOWER_S", "LOWER_MS", "LOWER_US", "LOWER_NS", "LOWER_PS", 
		"LOWER_FS", "HEX_DIGIT", "X_DIGIT", "Z_DIGIT", "UNDERSCORE", "QUESTION", 
		"C_IDENTIFIER", "SIMPLE_IDENTIFIER", "SYSTEM_TF_IDENTIFIER", "ESCAPED_IDENTIFIER", 
		"SPACE", "TAB", "NEWLINE", "ANY_ASCII_CHARACTER", "ONE_LINE_COMMENT", 
		"BLOCK_COMMENT", "FILENAME"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public LexRulesLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "LexRules.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2-\u013c\b\1\4\2\t"+
		"\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2"+
		"\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3"+
		"\7\3\b\3\b\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3"+
		"\17\5\17\u009b\n\17\3\17\3\17\3\20\3\20\5\20\u00a1\n\20\3\20\3\20\3\21"+
		"\3\21\5\21\u00a7\n\21\3\21\3\21\3\22\3\22\5\22\u00ad\n\22\3\22\3\22\3"+
		"\23\3\23\3\23\3\24\3\24\3\24\3\25\3\25\3\25\5\25\u00ba\n\25\3\26\3\26"+
		"\3\27\3\27\3\30\3\30\3\31\3\31\3\32\3\32\3\33\3\33\3\34\3\34\3\35\3\35"+
		"\3\36\3\36\3\37\3\37\3 \3 \3!\3!\3\"\3\"\3\"\3#\3#\3#\3$\3$\3$\3%\3%\3"+
		"%\3&\3&\3&\3\'\3\'\3(\3(\3)\3)\3*\3*\3+\3+\3,\3,\7,\u00ef\n,\f,\16,\u00f2"+
		"\13,\3-\3-\7-\u00f6\n-\f-\16-\u00f9\13-\3.\3.\3.\7.\u00fe\n.\f.\16.\u0101"+
		"\13.\3/\3/\7/\u0105\n/\f/\16/\u0108\13/\3\60\3\60\3\60\3\60\3\61\3\61"+
		"\3\61\3\61\3\62\5\62\u0113\n\62\3\62\3\62\3\62\3\62\3\63\3\63\3\64\3\64"+
		"\3\65\3\65\3\65\3\65\7\65\u0121\n\65\f\65\16\65\u0124\13\65\3\65\3\65"+
		"\3\65\3\65\3\66\3\66\3\66\3\66\7\66\u012e\n\66\f\66\16\66\u0131\13\66"+
		"\3\66\3\66\3\66\3\66\3\66\3\67\6\67\u0139\n\67\r\67\16\67\u013a\3\u012f"+
		"\28\3\3\5\4\7\5\t\2\13\2\r\2\17\2\21\2\23\2\25\2\27\2\31\2\33\2\35\6\37"+
		"\7!\b#\t%\n\'\13)\f+\r-\16/\17\61\20\63\21\65\22\67\239\24;\25=\26?\27"+
		"A\30C\31E\32G\33I\34K\35M\36O\37Q S!U\"W#Y$[%]&_\'a(c)e\2g*i+k,m-\3\2"+
		"$\4\2GGgg\3\2))\4\2UUuu\4\2FFff\4\2DDdd\4\2QQqq\4\2JJjj\4\2\\\\||\4\2"+
		"ZZzz\3\2\62\62\3\2\63\63\3\2\64\64\3\2\659\3\2:;\4\2HHhh\4\2TTtt\4\2R"+
		"Rrr\4\2PPpp\3\2uu\3\2oo\3\2ww\3\2pp\3\2rr\3\2hh\4\2CHch\3\2aa\3\2AA\5"+
		"\2C\\aac|\6\2\62;C\\aac|\7\2&&\62;C\\aac|\3\2#\u0080\3\2\2\u0081\3\2\f"+
		"\f\7\2/;C\\^^aac|\2\u013d\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\35\3\2"+
		"\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2"+
		"\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3"+
		"\2\2\2\2\67\3\2\2\2\29\3\2\2\2\2;\3\2\2\2\2=\3\2\2\2\2?\3\2\2\2\2A\3\2"+
		"\2\2\2C\3\2\2\2\2E\3\2\2\2\2G\3\2\2\2\2I\3\2\2\2\2K\3\2\2\2\2M\3\2\2\2"+
		"\2O\3\2\2\2\2Q\3\2\2\2\2S\3\2\2\2\2U\3\2\2\2\2W\3\2\2\2\2Y\3\2\2\2\2["+
		"\3\2\2\2\2]\3\2\2\2\2_\3\2\2\2\2a\3\2\2\2\2c\3\2\2\2\2g\3\2\2\2\2i\3\2"+
		"\2\2\2k\3\2\2\2\2m\3\2\2\2\3o\3\2\2\2\5{\3\2\2\2\7\u0082\3\2\2\2\t\u0084"+
		"\3\2\2\2\13\u0086\3\2\2\2\r\u0088\3\2\2\2\17\u008a\3\2\2\2\21\u008c\3"+
		"\2\2\2\23\u008e\3\2\2\2\25\u0090\3\2\2\2\27\u0092\3\2\2\2\31\u0094\3\2"+
		"\2\2\33\u0096\3\2\2\2\35\u0098\3\2\2\2\37\u009e\3\2\2\2!\u00a4\3\2\2\2"+
		"#\u00aa\3\2\2\2%\u00b0\3\2\2\2\'\u00b3\3\2\2\2)\u00b6\3\2\2\2+\u00bb\3"+
		"\2\2\2-\u00bd\3\2\2\2/\u00bf\3\2\2\2\61\u00c1\3\2\2\2\63\u00c3\3\2\2\2"+
		"\65\u00c5\3\2\2\2\67\u00c7\3\2\2\29\u00c9\3\2\2\2;\u00cb\3\2\2\2=\u00cd"+
		"\3\2\2\2?\u00cf\3\2\2\2A\u00d1\3\2\2\2C\u00d3\3\2\2\2E\u00d6\3\2\2\2G"+
		"\u00d9\3\2\2\2I\u00dc\3\2\2\2K\u00df\3\2\2\2M\u00e2\3\2\2\2O\u00e4\3\2"+
		"\2\2Q\u00e6\3\2\2\2S\u00e8\3\2\2\2U\u00ea\3\2\2\2W\u00ec\3\2\2\2Y\u00f3"+
		"\3\2\2\2[\u00fa\3\2\2\2]\u0102\3\2\2\2_\u0109\3\2\2\2a\u010d\3\2\2\2c"+
		"\u0112\3\2\2\2e\u0118\3\2\2\2g\u011a\3\2\2\2i\u011c\3\2\2\2k\u0129\3\2"+
		"\2\2m\u0138\3\2\2\2op\7o\2\2pq\7c\2\2qr\7e\2\2rs\7t\2\2st\7q\2\2tu\7o"+
		"\2\2uv\7q\2\2vw\7f\2\2wx\7w\2\2xy\7n\2\2yz\7g\2\2z\4\3\2\2\2{|\7o\2\2"+
		"|}\7q\2\2}~\7f\2\2~\177\7w\2\2\177\u0080\7n\2\2\u0080\u0081\7g\2\2\u0081"+
		"\6\3\2\2\2\u0082\u0083\t\2\2\2\u0083\b\3\2\2\2\u0084\u0085\t\3\2\2\u0085"+
		"\n\3\2\2\2\u0086\u0087\t\4\2\2\u0087\f\3\2\2\2\u0088\u0089\t\5\2\2\u0089"+
		"\16\3\2\2\2\u008a\u008b\t\6\2\2\u008b\20\3\2\2\2\u008c\u008d\t\7\2\2\u008d"+
		"\22\3\2\2\2\u008e\u008f\t\b\2\2\u008f\24\3\2\2\2\u0090\u0091\t\t\2\2\u0091"+
		"\26\3\2\2\2\u0092\u0093\t\n\2\2\u0093\30\3\2\2\2\u0094\u0095\t\13\2\2"+
		"\u0095\32\3\2\2\2\u0096\u0097\t\f\2\2\u0097\34\3\2\2\2\u0098\u009a\5\t"+
		"\5\2\u0099\u009b\5\13\6\2\u009a\u0099\3\2\2\2\u009a\u009b\3\2\2\2\u009b"+
		"\u009c\3\2\2\2\u009c\u009d\5\r\7\2\u009d\36\3\2\2\2\u009e\u00a0\5\t\5"+
		"\2\u009f\u00a1\5\13\6\2\u00a0\u009f\3\2\2\2\u00a0\u00a1\3\2\2\2\u00a1"+
		"\u00a2\3\2\2\2\u00a2\u00a3\5\17\b\2\u00a3 \3\2\2\2\u00a4\u00a6\5\t\5\2"+
		"\u00a5\u00a7\5\13\6\2\u00a6\u00a5\3\2\2\2\u00a6\u00a7\3\2\2\2\u00a7\u00a8"+
		"\3\2\2\2\u00a8\u00a9\5\21\t\2\u00a9\"\3\2\2\2\u00aa\u00ac\5\t\5\2\u00ab"+
		"\u00ad\5\13\6\2\u00ac\u00ab\3\2\2\2\u00ac\u00ad\3\2\2\2\u00ad\u00ae\3"+
		"\2\2\2\u00ae\u00af\5\23\n\2\u00af$\3\2\2\2\u00b0\u00b1\5\t\5\2\u00b1\u00b2"+
		"\5\31\r\2\u00b2&\3\2\2\2\u00b3\u00b4\5\t\5\2\u00b4\u00b5\5\33\16\2\u00b5"+
		"(\3\2\2\2\u00b6\u00b9\5\t\5\2\u00b7\u00ba\5\25\13\2\u00b8\u00ba\5\27\f"+
		"\2\u00b9\u00b7\3\2\2\2\u00b9\u00b8\3\2\2\2\u00ba*\3\2\2\2\u00bb\u00bc"+
		"\t\13\2\2\u00bc,\3\2\2\2\u00bd\u00be\t\f\2\2\u00be.\3\2\2\2\u00bf\u00c0"+
		"\t\r\2\2\u00c0\60\3\2\2\2\u00c1\u00c2\t\16\2\2\u00c2\62\3\2\2\2\u00c3"+
		"\u00c4\t\17\2\2\u00c4\64\3\2\2\2\u00c5\u00c6\t\3\2\2\u00c6\66\3\2\2\2"+
		"\u00c7\u00c8\t\6\2\2\u00c88\3\2\2\2\u00c9\u00ca\t\20\2\2\u00ca:\3\2\2"+
		"\2\u00cb\u00cc\t\21\2\2\u00cc<\3\2\2\2\u00cd\u00ce\t\22\2\2\u00ce>\3\2"+
		"\2\2\u00cf\u00d0\t\23\2\2\u00d0@\3\2\2\2\u00d1\u00d2\t\24\2\2\u00d2B\3"+
		"\2\2\2\u00d3\u00d4\t\25\2\2\u00d4\u00d5\t\24\2\2\u00d5D\3\2\2\2\u00d6"+
		"\u00d7\t\26\2\2\u00d7\u00d8\t\24\2\2\u00d8F\3\2\2\2\u00d9\u00da\t\27\2"+
		"\2\u00da\u00db\t\24\2\2\u00dbH\3\2\2\2\u00dc\u00dd\t\30\2\2\u00dd\u00de"+
		"\t\24\2\2\u00deJ\3\2\2\2\u00df\u00e0\t\31\2\2\u00e0\u00e1\t\24\2\2\u00e1"+
		"L\3\2\2\2\u00e2\u00e3\t\32\2\2\u00e3N\3\2\2\2\u00e4\u00e5\t\n\2\2\u00e5"+
		"P\3\2\2\2\u00e6\u00e7\t\t\2\2\u00e7R\3\2\2\2\u00e8\u00e9\t\33\2\2\u00e9"+
		"T\3\2\2\2\u00ea\u00eb\t\34\2\2\u00ebV\3\2\2\2\u00ec\u00f0\t\35\2\2\u00ed"+
		"\u00ef\t\36\2\2\u00ee\u00ed\3\2\2\2\u00ef\u00f2\3\2\2\2\u00f0\u00ee\3"+
		"\2\2\2\u00f0\u00f1\3\2\2\2\u00f1X\3\2\2\2\u00f2\u00f0\3\2\2\2\u00f3\u00f7"+
		"\t\35\2\2\u00f4\u00f6\t\37\2\2\u00f5\u00f4\3\2\2\2\u00f6\u00f9\3\2\2\2"+
		"\u00f7\u00f5\3\2\2\2\u00f7\u00f8\3\2\2\2\u00f8Z\3\2\2\2\u00f9\u00f7\3"+
		"\2\2\2\u00fa\u00fb\7&\2\2\u00fb\u00ff\t\37\2\2\u00fc\u00fe\t\37\2\2\u00fd"+
		"\u00fc\3\2\2\2\u00fe\u0101\3\2\2\2\u00ff\u00fd\3\2\2\2\u00ff\u0100\3\2"+
		"\2\2\u0100\\\3\2\2\2\u0101\u00ff\3\2\2\2\u0102\u0106\7^\2\2\u0103\u0105"+
		"\5e\63\2\u0104\u0103\3\2\2\2\u0105\u0108\3\2\2\2\u0106\u0104\3\2\2\2\u0106"+
		"\u0107\3\2\2\2\u0107^\3\2\2\2\u0108\u0106\3\2\2\2\u0109\u010a\7\"\2\2"+
		"\u010a\u010b\3\2\2\2\u010b\u010c\b\60\2\2\u010c`\3\2\2\2\u010d\u010e\7"+
		"\13\2\2\u010e\u010f\3\2\2\2\u010f\u0110\b\61\2\2\u0110b\3\2\2\2\u0111"+
		"\u0113\7\17\2\2\u0112\u0111\3\2\2\2\u0112\u0113\3\2\2\2\u0113\u0114\3"+
		"\2\2\2\u0114\u0115\7\f\2\2\u0115\u0116\3\2\2\2\u0116\u0117\b\62\2\2\u0117"+
		"d\3\2\2\2\u0118\u0119\t \2\2\u0119f\3\2\2\2\u011a\u011b\t!\2\2\u011bh"+
		"\3\2\2\2\u011c\u011d\7\61\2\2\u011d\u011e\7\61\2\2\u011e\u0122\3\2\2\2"+
		"\u011f\u0121\n\"\2\2\u0120\u011f\3\2\2\2\u0121\u0124\3\2\2\2\u0122\u0120"+
		"\3\2\2\2\u0122\u0123\3\2\2\2\u0123\u0125\3\2\2\2\u0124\u0122\3\2\2\2\u0125"+
		"\u0126\7\f\2\2\u0126\u0127\3\2\2\2\u0127\u0128\b\65\2\2\u0128j\3\2\2\2"+
		"\u0129\u012a\7\61\2\2\u012a\u012b\7,\2\2\u012b\u012f\3\2\2\2\u012c\u012e"+
		"\13\2\2\2\u012d\u012c\3\2\2\2\u012e\u0131\3\2\2\2\u012f\u0130\3\2\2\2"+
		"\u012f\u012d\3\2\2\2\u0130\u0132\3\2\2\2\u0131\u012f\3\2\2\2\u0132\u0133"+
		"\7,\2\2\u0133\u0134\7\61\2\2\u0134\u0135\3\2\2\2\u0135\u0136\b\66\2\2"+
		"\u0136l\3\2\2\2\u0137\u0139\t#\2\2\u0138\u0137\3\2\2\2\u0139\u013a\3\2"+
		"\2\2\u013a\u0138\3\2\2\2\u013a\u013b\3\2\2\2\u013bn\3\2\2\2\20\2\u009a"+
		"\u00a0\u00a6\u00ac\u00b9\u00f0\u00f7\u00ff\u0106\u0112\u0122\u012f\u013a"+
		"\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}