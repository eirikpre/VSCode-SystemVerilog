// Generated from c:\Users\Vincent\Programming\VSCodeSVExtension\src\compiling\ANTLR\grammar/LexRules.g4 by ANTLR 4.7.1
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
		ONE_LINE_COMMENT=41, BLOCK_COMMENT=42, FILENAME=43, STRING_LITERAL=44;
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
		"ONE_LINE_COMMENT", "BLOCK_COMMENT", "FILENAME", "STRING_LITERAL"
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
		"BLOCK_COMMENT", "FILENAME", "STRING_LITERAL"
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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2.\u0160\b\1\4\2\t"+
		"\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22\t\22"+
		"\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31\t\31"+
		"\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t \4!"+
		"\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t+\4"+
		",\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64\t"+
		"\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3"+
		"\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\4\3\4\3\5\3\5\3\6\3\6"+
		"\3\7\3\7\3\b\3\b\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\r\3\r\3\16\3\16\3"+
		"\17\3\17\5\17\u009d\n\17\3\17\3\17\3\20\3\20\5\20\u00a3\n\20\3\20\3\20"+
		"\3\21\3\21\5\21\u00a9\n\21\3\21\3\21\3\22\3\22\5\22\u00af\n\22\3\22\3"+
		"\22\3\23\3\23\3\23\3\24\3\24\3\24\3\25\3\25\3\25\5\25\u00bc\n\25\3\26"+
		"\3\26\3\27\3\27\3\30\3\30\3\31\3\31\3\32\3\32\3\33\3\33\3\34\3\34\3\35"+
		"\3\35\3\36\3\36\3\37\3\37\3 \3 \3!\3!\3\"\3\"\3\"\3#\3#\3#\3$\3$\3$\3"+
		"%\3%\3%\3&\3&\3&\3\'\3\'\3(\3(\3)\3)\3*\3*\3+\3+\3,\3,\7,\u00f1\n,\f,"+
		"\16,\u00f4\13,\3-\3-\7-\u00f8\n-\f-\16-\u00fb\13-\3.\3.\3.\7.\u0100\n"+
		".\f.\16.\u0103\13.\3/\3/\7/\u0107\n/\f/\16/\u010a\13/\3\60\3\60\3\60\3"+
		"\60\3\61\3\61\3\61\3\61\3\62\5\62\u0115\n\62\3\62\3\62\3\62\3\62\3\63"+
		"\3\63\3\64\3\64\3\65\3\65\3\65\3\65\7\65\u0123\n\65\f\65\16\65\u0126\13"+
		"\65\3\65\3\65\3\65\3\65\3\66\3\66\3\66\3\66\7\66\u0130\n\66\f\66\16\66"+
		"\u0133\13\66\3\66\3\66\3\66\3\66\3\66\3\67\3\67\6\67\u013c\n\67\r\67\16"+
		"\67\u013d\3\67\3\67\3\67\3\67\5\67\u0144\n\67\3\67\3\67\3\67\6\67\u0149"+
		"\n\67\r\67\16\67\u014a\3\67\3\67\3\67\3\67\5\67\u0151\n\67\3\67\5\67\u0154"+
		"\n\67\38\38\38\38\78\u015a\n8\f8\168\u015d\138\38\38\3\u0131\29\3\3\5"+
		"\4\7\5\t\2\13\2\r\2\17\2\21\2\23\2\25\2\27\2\31\2\33\2\35\6\37\7!\b#\t"+
		"%\n\'\13)\f+\r-\16/\17\61\20\63\21\65\22\67\239\24;\25=\26?\27A\30C\31"+
		"E\32G\33I\34K\35M\36O\37Q S!U\"W#Y$[%]&_\'a(c)e\2g*i+k,m-o.\3\2%\4\2G"+
		"Ggg\3\2))\4\2UUuu\4\2FFff\4\2DDdd\4\2QQqq\4\2JJjj\4\2\\\\||\4\2ZZzz\3"+
		"\2\62\62\3\2\63\63\3\2\64\64\3\2\659\3\2:;\4\2HHhh\4\2TTtt\4\2RRrr\4\2"+
		"PPpp\3\2uu\3\2oo\3\2ww\3\2pp\3\2rr\3\2hh\4\2CHch\3\2aa\3\2AA\5\2C\\aa"+
		"c|\6\2\62;C\\aac|\7\2&&\62;C\\aac|\3\2#\u0080\3\2\2\u0081\3\2\f\f\7\2"+
		"/;C\\^^aac|\3\2$$\2\u0167\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\35\3\2"+
		"\2\2\2\37\3\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2"+
		"\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3"+
		"\2\2\2\2\67\3\2\2\2\29\3\2\2\2\2;\3\2\2\2\2=\3\2\2\2\2?\3\2\2\2\2A\3\2"+
		"\2\2\2C\3\2\2\2\2E\3\2\2\2\2G\3\2\2\2\2I\3\2\2\2\2K\3\2\2\2\2M\3\2\2\2"+
		"\2O\3\2\2\2\2Q\3\2\2\2\2S\3\2\2\2\2U\3\2\2\2\2W\3\2\2\2\2Y\3\2\2\2\2["+
		"\3\2\2\2\2]\3\2\2\2\2_\3\2\2\2\2a\3\2\2\2\2c\3\2\2\2\2g\3\2\2\2\2i\3\2"+
		"\2\2\2k\3\2\2\2\2m\3\2\2\2\2o\3\2\2\2\3q\3\2\2\2\5}\3\2\2\2\7\u0084\3"+
		"\2\2\2\t\u0086\3\2\2\2\13\u0088\3\2\2\2\r\u008a\3\2\2\2\17\u008c\3\2\2"+
		"\2\21\u008e\3\2\2\2\23\u0090\3\2\2\2\25\u0092\3\2\2\2\27\u0094\3\2\2\2"+
		"\31\u0096\3\2\2\2\33\u0098\3\2\2\2\35\u009a\3\2\2\2\37\u00a0\3\2\2\2!"+
		"\u00a6\3\2\2\2#\u00ac\3\2\2\2%\u00b2\3\2\2\2\'\u00b5\3\2\2\2)\u00b8\3"+
		"\2\2\2+\u00bd\3\2\2\2-\u00bf\3\2\2\2/\u00c1\3\2\2\2\61\u00c3\3\2\2\2\63"+
		"\u00c5\3\2\2\2\65\u00c7\3\2\2\2\67\u00c9\3\2\2\29\u00cb\3\2\2\2;\u00cd"+
		"\3\2\2\2=\u00cf\3\2\2\2?\u00d1\3\2\2\2A\u00d3\3\2\2\2C\u00d5\3\2\2\2E"+
		"\u00d8\3\2\2\2G\u00db\3\2\2\2I\u00de\3\2\2\2K\u00e1\3\2\2\2M\u00e4\3\2"+
		"\2\2O\u00e6\3\2\2\2Q\u00e8\3\2\2\2S\u00ea\3\2\2\2U\u00ec\3\2\2\2W\u00ee"+
		"\3\2\2\2Y\u00f5\3\2\2\2[\u00fc\3\2\2\2]\u0104\3\2\2\2_\u010b\3\2\2\2a"+
		"\u010f\3\2\2\2c\u0114\3\2\2\2e\u011a\3\2\2\2g\u011c\3\2\2\2i\u011e\3\2"+
		"\2\2k\u012b\3\2\2\2m\u0153\3\2\2\2o\u0155\3\2\2\2qr\7o\2\2rs\7c\2\2st"+
		"\7e\2\2tu\7t\2\2uv\7q\2\2vw\7o\2\2wx\7q\2\2xy\7f\2\2yz\7w\2\2z{\7n\2\2"+
		"{|\7g\2\2|\4\3\2\2\2}~\7o\2\2~\177\7q\2\2\177\u0080\7f\2\2\u0080\u0081"+
		"\7w\2\2\u0081\u0082\7n\2\2\u0082\u0083\7g\2\2\u0083\6\3\2\2\2\u0084\u0085"+
		"\t\2\2\2\u0085\b\3\2\2\2\u0086\u0087\t\3\2\2\u0087\n\3\2\2\2\u0088\u0089"+
		"\t\4\2\2\u0089\f\3\2\2\2\u008a\u008b\t\5\2\2\u008b\16\3\2\2\2\u008c\u008d"+
		"\t\6\2\2\u008d\20\3\2\2\2\u008e\u008f\t\7\2\2\u008f\22\3\2\2\2\u0090\u0091"+
		"\t\b\2\2\u0091\24\3\2\2\2\u0092\u0093\t\t\2\2\u0093\26\3\2\2\2\u0094\u0095"+
		"\t\n\2\2\u0095\30\3\2\2\2\u0096\u0097\t\13\2\2\u0097\32\3\2\2\2\u0098"+
		"\u0099\t\f\2\2\u0099\34\3\2\2\2\u009a\u009c\5\t\5\2\u009b\u009d\5\13\6"+
		"\2\u009c\u009b\3\2\2\2\u009c\u009d\3\2\2\2\u009d\u009e\3\2\2\2\u009e\u009f"+
		"\5\r\7\2\u009f\36\3\2\2\2\u00a0\u00a2\5\t\5\2\u00a1\u00a3\5\13\6\2\u00a2"+
		"\u00a1\3\2\2\2\u00a2\u00a3\3\2\2\2\u00a3\u00a4\3\2\2\2\u00a4\u00a5\5\17"+
		"\b\2\u00a5 \3\2\2\2\u00a6\u00a8\5\t\5\2\u00a7\u00a9\5\13\6\2\u00a8\u00a7"+
		"\3\2\2\2\u00a8\u00a9\3\2\2\2\u00a9\u00aa\3\2\2\2\u00aa\u00ab\5\21\t\2"+
		"\u00ab\"\3\2\2\2\u00ac\u00ae\5\t\5\2\u00ad\u00af\5\13\6\2\u00ae\u00ad"+
		"\3\2\2\2\u00ae\u00af\3\2\2\2\u00af\u00b0\3\2\2\2\u00b0\u00b1\5\23\n\2"+
		"\u00b1$\3\2\2\2\u00b2\u00b3\5\t\5\2\u00b3\u00b4\5\31\r\2\u00b4&\3\2\2"+
		"\2\u00b5\u00b6\5\t\5\2\u00b6\u00b7\5\33\16\2\u00b7(\3\2\2\2\u00b8\u00bb"+
		"\5\t\5\2\u00b9\u00bc\5\25\13\2\u00ba\u00bc\5\27\f\2\u00bb\u00b9\3\2\2"+
		"\2\u00bb\u00ba\3\2\2\2\u00bc*\3\2\2\2\u00bd\u00be\t\13\2\2\u00be,\3\2"+
		"\2\2\u00bf\u00c0\t\f\2\2\u00c0.\3\2\2\2\u00c1\u00c2\t\r\2\2\u00c2\60\3"+
		"\2\2\2\u00c3\u00c4\t\16\2\2\u00c4\62\3\2\2\2\u00c5\u00c6\t\17\2\2\u00c6"+
		"\64\3\2\2\2\u00c7\u00c8\t\3\2\2\u00c8\66\3\2\2\2\u00c9\u00ca\t\6\2\2\u00ca"+
		"8\3\2\2\2\u00cb\u00cc\t\20\2\2\u00cc:\3\2\2\2\u00cd\u00ce\t\21\2\2\u00ce"+
		"<\3\2\2\2\u00cf\u00d0\t\22\2\2\u00d0>\3\2\2\2\u00d1\u00d2\t\23\2\2\u00d2"+
		"@\3\2\2\2\u00d3\u00d4\t\24\2\2\u00d4B\3\2\2\2\u00d5\u00d6\t\25\2\2\u00d6"+
		"\u00d7\t\24\2\2\u00d7D\3\2\2\2\u00d8\u00d9\t\26\2\2\u00d9\u00da\t\24\2"+
		"\2\u00daF\3\2\2\2\u00db\u00dc\t\27\2\2\u00dc\u00dd\t\24\2\2\u00ddH\3\2"+
		"\2\2\u00de\u00df\t\30\2\2\u00df\u00e0\t\24\2\2\u00e0J\3\2\2\2\u00e1\u00e2"+
		"\t\31\2\2\u00e2\u00e3\t\24\2\2\u00e3L\3\2\2\2\u00e4\u00e5\t\32\2\2\u00e5"+
		"N\3\2\2\2\u00e6\u00e7\t\n\2\2\u00e7P\3\2\2\2\u00e8\u00e9\t\t\2\2\u00e9"+
		"R\3\2\2\2\u00ea\u00eb\t\33\2\2\u00ebT\3\2\2\2\u00ec\u00ed\t\34\2\2\u00ed"+
		"V\3\2\2\2\u00ee\u00f2\t\35\2\2\u00ef\u00f1\t\36\2\2\u00f0\u00ef\3\2\2"+
		"\2\u00f1\u00f4\3\2\2\2\u00f2\u00f0\3\2\2\2\u00f2\u00f3\3\2\2\2\u00f3X"+
		"\3\2\2\2\u00f4\u00f2\3\2\2\2\u00f5\u00f9\t\35\2\2\u00f6\u00f8\t\37\2\2"+
		"\u00f7\u00f6\3\2\2\2\u00f8\u00fb\3\2\2\2\u00f9\u00f7\3\2\2\2\u00f9\u00fa"+
		"\3\2\2\2\u00faZ\3\2\2\2\u00fb\u00f9\3\2\2\2\u00fc\u00fd\7&\2\2\u00fd\u0101"+
		"\t\37\2\2\u00fe\u0100\t\37\2\2\u00ff\u00fe\3\2\2\2\u0100\u0103\3\2\2\2"+
		"\u0101\u00ff\3\2\2\2\u0101\u0102\3\2\2\2\u0102\\\3\2\2\2\u0103\u0101\3"+
		"\2\2\2\u0104\u0108\7^\2\2\u0105\u0107\5e\63\2\u0106\u0105\3\2\2\2\u0107"+
		"\u010a\3\2\2\2\u0108\u0106\3\2\2\2\u0108\u0109\3\2\2\2\u0109^\3\2\2\2"+
		"\u010a\u0108\3\2\2\2\u010b\u010c\7\"\2\2\u010c\u010d\3\2\2\2\u010d\u010e"+
		"\b\60\2\2\u010e`\3\2\2\2\u010f\u0110\7\13\2\2\u0110\u0111\3\2\2\2\u0111"+
		"\u0112\b\61\2\2\u0112b\3\2\2\2\u0113\u0115\7\17\2\2\u0114\u0113\3\2\2"+
		"\2\u0114\u0115\3\2\2\2\u0115\u0116\3\2\2\2\u0116\u0117\7\f\2\2\u0117\u0118"+
		"\3\2\2\2\u0118\u0119\b\62\2\2\u0119d\3\2\2\2\u011a\u011b\t \2\2\u011b"+
		"f\3\2\2\2\u011c\u011d\t!\2\2\u011dh\3\2\2\2\u011e\u011f\7\61\2\2\u011f"+
		"\u0120\7\61\2\2\u0120\u0124\3\2\2\2\u0121\u0123\n\"\2\2\u0122\u0121\3"+
		"\2\2\2\u0123\u0126\3\2\2\2\u0124\u0122\3\2\2\2\u0124\u0125\3\2\2\2\u0125"+
		"\u0127\3\2\2\2\u0126\u0124\3\2\2\2\u0127\u0128\7\f\2\2\u0128\u0129\3\2"+
		"\2\2\u0129\u012a\b\65\2\2\u012aj\3\2\2\2\u012b\u012c\7\61\2\2\u012c\u012d"+
		"\7,\2\2\u012d\u0131\3\2\2\2\u012e\u0130\13\2\2\2\u012f\u012e\3\2\2\2\u0130"+
		"\u0133\3\2\2\2\u0131\u0132\3\2\2\2\u0131\u012f\3\2\2\2\u0132\u0134\3\2"+
		"\2\2\u0133\u0131\3\2\2\2\u0134\u0135\7,\2\2\u0135\u0136\7\61\2\2\u0136"+
		"\u0137\3\2\2\2\u0137\u0138\b\66\2\2\u0138l\3\2\2\2\u0139\u013b\7>\2\2"+
		"\u013a\u013c\t#\2\2\u013b\u013a\3\2\2\2\u013c\u013d\3\2\2\2\u013d\u013b"+
		"\3\2\2\2\u013d\u013e\3\2\2\2\u013e\u013f\3\2\2\2\u013f\u0143\7\60\2\2"+
		"\u0140\u0144\7x\2\2\u0141\u0142\7u\2\2\u0142\u0144\7x\2\2\u0143\u0140"+
		"\3\2\2\2\u0143\u0141\3\2\2\2\u0144\u0145\3\2\2\2\u0145\u0154\7@\2\2\u0146"+
		"\u0148\7$\2\2\u0147\u0149\t#\2\2\u0148\u0147\3\2\2\2\u0149\u014a\3\2\2"+
		"\2\u014a\u0148\3\2\2\2\u014a\u014b\3\2\2\2\u014b\u014c\3\2\2\2\u014c\u0150"+
		"\7\60\2\2\u014d\u0151\7x\2\2\u014e\u014f\7u\2\2\u014f\u0151\7x\2\2\u0150"+
		"\u014d\3\2\2\2\u0150\u014e\3\2\2\2\u0151\u0152\3\2\2\2\u0152\u0154\7$"+
		"\2\2\u0153\u0139\3\2\2\2\u0153\u0146\3\2\2\2\u0154n\3\2\2\2\u0155\u015b"+
		"\7$\2\2\u0156\u015a\n$\2\2\u0157\u0158\7^\2\2\u0158\u015a\7$\2\2\u0159"+
		"\u0156\3\2\2\2\u0159\u0157\3\2\2\2\u015a\u015d\3\2\2\2\u015b\u0159\3\2"+
		"\2\2\u015b\u015c\3\2\2\2\u015c\u015e\3\2\2\2\u015d\u015b\3\2\2\2\u015e"+
		"\u015f\7$\2\2\u015fp\3\2\2\2\26\2\u009c\u00a2\u00a8\u00ae\u00bb\u00f2"+
		"\u00f9\u0101\u0108\u0114\u0124\u0131\u013d\u0143\u014a\u0150\u0153\u0159"+
		"\u015b\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}