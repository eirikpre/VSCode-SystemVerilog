// Generated from c:\dev\2019FallTeam19\src\compiling\ANTLR\grammar\Comments.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class CommentsParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, ANY_ASCII_CHARACTER=5;
	public static final int
		RULE_comment = 0, RULE_one_line_comment = 1, RULE_block_comment = 2, RULE_comment_text = 3;
	public static final String[] ruleNames = {
		"comment", "one_line_comment", "block_comment", "comment_text"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'//'", "'\n'", "'/*'", "'*/'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, null, null, "ANY_ASCII_CHARACTER"
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

	@Override
	public String getGrammarFileName() { return "Comments.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public CommentsParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class CommentContext extends ParserRuleContext {
		public One_line_commentContext one_line_comment() {
			return getRuleContext(One_line_commentContext.class,0);
		}
		public Block_commentContext block_comment() {
			return getRuleContext(Block_commentContext.class,0);
		}
		public CommentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment; }
	}

	public final CommentContext comment() throws RecognitionException {
		CommentContext _localctx = new CommentContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_comment);
		try {
			setState(10);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__0:
				enterOuterAlt(_localctx, 1);
				{
				setState(8);
				one_line_comment();
				}
				break;
			case T__2:
				enterOuterAlt(_localctx, 2);
				{
				setState(9);
				block_comment();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class One_line_commentContext extends ParserRuleContext {
		public Comment_textContext comment_text() {
			return getRuleContext(Comment_textContext.class,0);
		}
		public One_line_commentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_one_line_comment; }
	}

	public final One_line_commentContext one_line_comment() throws RecognitionException {
		One_line_commentContext _localctx = new One_line_commentContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_one_line_comment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(12);
			match(T__0);
			setState(13);
			comment_text();
			setState(14);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Block_commentContext extends ParserRuleContext {
		public Comment_textContext comment_text() {
			return getRuleContext(Comment_textContext.class,0);
		}
		public Block_commentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_block_comment; }
	}

	public final Block_commentContext block_comment() throws RecognitionException {
		Block_commentContext _localctx = new Block_commentContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_block_comment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(16);
			match(T__2);
			setState(17);
			comment_text();
			setState(18);
			match(T__3);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Comment_textContext extends ParserRuleContext {
		public List<TerminalNode> ANY_ASCII_CHARACTER() { return getTokens(CommentsParser.ANY_ASCII_CHARACTER); }
		public TerminalNode ANY_ASCII_CHARACTER(int i) {
			return getToken(CommentsParser.ANY_ASCII_CHARACTER, i);
		}
		public Comment_textContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comment_text; }
	}

	public final Comment_textContext comment_text() throws RecognitionException {
		Comment_textContext _localctx = new Comment_textContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_comment_text);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(23);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==ANY_ASCII_CHARACTER) {
				{
				{
				setState(20);
				match(ANY_ASCII_CHARACTER);
				}
				}
				setState(25);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\7\35\4\2\t\2\4\3"+
		"\t\3\4\4\t\4\4\5\t\5\3\2\3\2\5\2\r\n\2\3\3\3\3\3\3\3\3\3\4\3\4\3\4\3\4"+
		"\3\5\7\5\30\n\5\f\5\16\5\33\13\5\3\5\2\2\6\2\4\6\b\2\2\2\32\2\f\3\2\2"+
		"\2\4\16\3\2\2\2\6\22\3\2\2\2\b\31\3\2\2\2\n\r\5\4\3\2\13\r\5\6\4\2\f\n"+
		"\3\2\2\2\f\13\3\2\2\2\r\3\3\2\2\2\16\17\7\3\2\2\17\20\5\b\5\2\20\21\7"+
		"\4\2\2\21\5\3\2\2\2\22\23\7\5\2\2\23\24\5\b\5\2\24\25\7\6\2\2\25\7\3\2"+
		"\2\2\26\30\7\7\2\2\27\26\3\2\2\2\30\33\3\2\2\2\31\27\3\2\2\2\31\32\3\2"+
		"\2\2\32\t\3\2\2\2\33\31\3\2\2\2\4\f\31";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}